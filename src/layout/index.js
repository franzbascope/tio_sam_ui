import React from "react";
import NavigationBar from "../layout/navBar";
import { Container } from "react-bootstrap";
export default (props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="m-5">
        <Container fluid>{props.children}</Container>
      </div>
    </React.Fragment>
  );
};
