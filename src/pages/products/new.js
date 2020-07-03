import React, { useState } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../shared/breadCrumbs";

export default () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const data = new FormData(form);
    let request = {};
    for (let name of data.keys()) {
      const input = form.elements[name];
      request[name] = input.value;
    }
    console.log(request);
    setValidated(true);
  };
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group md="4" as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required type="text" />
              </Form.Group>
              <Form.Group md="4" as={Col} controlId="formGridEmail">
                <Form.Label>Cost</Form.Label>
                <Form.Control name="cost" required type="number" />
              </Form.Group>

              <Form.Group md="4" as={Col} controlId="formGridPassword">
                <Form.Label>Weight</Form.Label>
                <Form.Control name="weight" required type="number" />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Link to="/products" className="btn btn-danger ml-3">
              Cancel
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
