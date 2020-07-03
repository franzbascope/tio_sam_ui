import React from "react";
import { Spinner } from "react-bootstrap";

export default () => {
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <Spinner animation="border" variant="primary" />
      </div>
    </React.Fragment>
  );
};
