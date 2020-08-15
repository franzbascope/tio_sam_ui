import axios from "axios";
import { useGlobal } from "reactn";
import { mainUrl as API_URL } from "./urls";
import { useHistory } from "react-router-dom";

export default () => {
  const [globalValues, setGlobalValues] = useGlobal();
  let session = sessionStorage.getItem("tioSamUser");
  let config = {};
  if (session) {
    let user = JSON.parse(sessionStorage.getItem("tioSamUser"));
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }
  const history = useHistory();
  const requestHandler = async (method, url, data, id = null, message = "", query="") => {
    let res = null;
    setGlobalValues({ ...globalValues, loading: true });
    try {
      switch (method) {
        case "GET":
          res = await axios.get(`${API_URL}/${url}`, config);
          break;
        case "EDIT":
          res = await axios.get(`${API_URL}/${url}/${id}`, config);
          break;
        case "POST":
          res = await axios.post(`${API_URL}/${url}`, data, config);
          break;
        case "PUT":
          res = await axios.put(`${API_URL}/${url}/${id}`, data, config);
          break;
        case "DELETE":
          res = await axios.delete(`${API_URL}/${url}/${id}`, config);
          break;
        case "PAGE":
          if (!id) id = 1;
          res = await axios.get(`${API_URL}/${url}/page/${id}?${query}`, config);
          console.log(`${API_URL}/${url}/page/${id}?${query}`);
          break;
      }
    } catch (err) {
      debugger;
      let errorCode = err.request.status;
      if (errorCode == 401) {
        setGlobalValues({
          ...globalValues,
          error: "",
          loading: false,
          success: "",
        });
        sessionStorage.removeItem("tioSamUser");
        history.push("/login");
        return;
      }
      let errorMessage = err.response.data.message;
      setGlobalValues({ ...globalValues, error: errorMessage, loading: false });
      return;
    }
    setGlobalValues({ ...globalValues, loading: false });
    if (method != "GET") {
      setGlobalValues({ ...globalValues, success: message });
    }
    if( method == "PAGE"){
      setGlobalValues({
        ...globalValues,
        totalPages: res.data.totalPages,
        currentPage: id,
      });
    }
    return res;
  };
  return requestHandler;
};
