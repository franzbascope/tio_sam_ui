import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  return (
    <Navbar bg="white" className="border-bottom shadow-sm " variant="light">
      <Link className="navbar-brand" to="/">
        Tio Sam
      </Link>
      <Nav className="mr-auto">
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/buys" className="nav-link">
          Compras
        </Link>
      </Nav>
      <Form inline>
        <Button
          onClick={() => {
            sessionStorage.removeItem("tioSamUser");
            history.push("/login");
          }}
          variant="outline-primary"
        >
          Logout
        </Button>
      </Form>
    </Navbar>
  );
};
