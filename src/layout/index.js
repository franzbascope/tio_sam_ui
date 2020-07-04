import React from "react";
import NavigationBar from "../layout/navBar";
import { Container } from "react-bootstrap";
export default (props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container className="mt-5">{props.children}</Container>
    </React.Fragment>
  );
};
