import axios from "axios";
import { useGlobal } from "reactn";
import { mainUrl as API_URL } from "./urls";

export default () => {
  const [globalValues, setGlobalValues] = useGlobal();
  const requestHandler = async (method, url, data, id = null, message = "") => {
    let res = null;
    setGlobalValues({ ...globalValues, loading: true });
    try {
      switch (method) {
        case "GET":
          res = await axios.get(`${API_URL}/${url}`);
          break;
        case "EDIT":
          res = await axios.get(`${API_URL}/${url}/${id}`);
          break;
        case "POST":
          res = await axios.post(`${API_URL}/${url}`, data);
          break;
        case "PUT":
          res = await axios.put(`${API_URL}/${url}/${id}`, data);
          break;
        case "DELETE":
          res = await axios.delete(`${API_URL}/${url}/${id}`);
          break;
      }
    } catch (err) {
      let errorMessage = err.response.data.message;
      setGlobalValues({ ...globalValues, error: errorMessage, loading: false });
      return;
    }
    setGlobalValues({ ...globalValues, loading: false, success: message });
    return res;
  };
  return requestHandler;
};
