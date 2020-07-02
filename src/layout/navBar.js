import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

const navigationBar = () => {
  return (
    <Navbar bg="white" className="border-bottom shadow-sm" variant="light">
      <Navbar.Brand href="#home">TioSam</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Products</Nav.Link>
        <NavDropdown title="Sells" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">New sell</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">List</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      </Nav>
      <Form inline>
        <Button variant="outline-primary">Logout</Button>
      </Form>
    </Navbar>
  );
};

export default navigationBar;
