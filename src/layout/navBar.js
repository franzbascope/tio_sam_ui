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
        <Link to="/sells" className="nav-link">
          Ventas
        </Link>
        {/* <NavDropdown title="Sells" id="basic-nav-dropdown">
        
          <NavDropdown.Item href="#action/3.1">New sell</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">List</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown> */}
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
