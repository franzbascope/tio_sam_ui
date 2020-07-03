import mainState from "./mainState";
import axios from "axios";
import { mainUrl as API_URL } from "./urls";

export default () => {
  const { inputValues, setValues } = mainState();
  const requestHandler = async (method, url, data, id = null) => {
    let res = null;
    setValues({ ...inputValues, loading: false });
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
      setValues({ ...inputValues, error: err });
    }
    setValues({ ...inputValues, loading: false });
    return res;
  };
  return requestHandler;
};
