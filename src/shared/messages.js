import React, { useGlobal } from "reactn";
import { Alert } from "react-bootstrap";

export default () => {
  const [globalValues, setGlobalValues] = useGlobal();
  return globalValues.error ? (
    <Alert
      variant="danger"
      onClose={() => setGlobalValues({ ...globalValues, error: "" })}
      dismissible
    >
      {globalValues.error}
    </Alert>
  ) : globalValues.success ? (
    <Alert
      variant="success"
      onClose={() => setGlobalValues({ ...globalValues, success: "" })}
      dismissible
    >
      {globalValues.success}
    </Alert>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
