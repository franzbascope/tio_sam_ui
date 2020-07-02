import React from "react";
import "./App.css";
import NavigationBar from "./layout/navBar";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="m-5">
        <Container fluid className="bg-primary">
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
