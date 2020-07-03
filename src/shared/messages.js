import React from "react";
import { Alert } from "react-bootstrap";
import mainState from "./mainState";

export default () => {
  const { inputValues, setValues } = mainState();
  return inputValues.error ? (
    <Alert
      variant="danger"
      onClose={() => setValues({ ...inputValues, error: "" })}
      dismissible
    >
      {inputValues.error}
    </Alert>
  ) : inputValues.success ? (
    <Alert
      variant="success"
      onClose={() => setValues({ ...inputValues, success: "" })}
      dismissible
    >
      {inputValues.success}
    </Alert>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
