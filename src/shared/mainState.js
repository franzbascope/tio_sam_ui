import { useState } from "react";

export default () => {
  const [inputValues, setValues] = useState({
    error: "",
    success: "",
    loading: false,
  });

  return { inputValues, setValues };
};
