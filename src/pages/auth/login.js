import React from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import logo from "../../assets/tioSamLogo.png";

export default () => {
  return (
    <Container
    // style={{
    //   display: "flex",
    //   justifyContent: "center",
    // }}
    >
      <Row style={{ justifyContent: "center" }}>
        <Col md={4} style={{ position: "absolute", top: "20%" }}>
          <Card className="p-5 ">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img style={{ width: "150px" }} src={logo} alt="imageb_logo" />
            </div>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="mt-2"
            >
              <h3>Login</h3>
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
