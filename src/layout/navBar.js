import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const navigationBar = () => {
  return (
    <Navbar bg="white" className="border-bottom shadow-sm " variant="light">
      <Link className="navbar-brand" to="/">
        TioSam
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
        <Button variant="outline-primary">Logout</Button>
      </Form>
    </Navbar>
  );
};

export default navigationBar;
