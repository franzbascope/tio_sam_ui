import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import logo from "../../assets/tioSamLogo.png";
import mainHandler from "../../shared/requestHandler";
import { loginUrl, mainUrl } from "../../shared/urls";
import Messages from "../../shared/messages";
import { useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../../shared/loader";

//hello!
export default () => {
  const [globalValues, setGlobalValues] = useGlobal();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const { email, password } = loginForm;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      loginUser(loginForm);
    }
  };
  const history = useHistory();

  const loginUser = async (request) => {
    try {
      const API_URL = mainUrl();
      setGlobalValues({ ...globalValues, loading: true });
      let res = await axios.post(
        `${API_URL}/${loginUrl}`,
        {},
        {
          auth: {
            username: loginForm.email,
            password: loginForm.password,
          },
        }
      );
      setGlobalValues({
        ...globalValues,
        success: "Login Successfully",
        loading: false,
        error: "",
      });
      if (res.status == 200) {
        let user = { ...loginForm, token: res.data.access_token };
        sessionStorage.setItem("tioSamUser", JSON.stringify(user));
        history.push("/products");
      }
    } catch (err) {
      let errorMessage = err.response.data.message;
      setGlobalValues({ ...globalValues, error: errorMessage, loading: false });
    }
  };
  return (
    <Container>
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
            <Messages />
            {globalValues.loading ? (
              <Loader />
            ) : (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required={true}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    className="text-muted"
                  />
                  <Form.Text>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required={true}
                    value={password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
