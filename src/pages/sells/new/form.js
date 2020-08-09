import React, { useState } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../../shared/loader";

export default ({ loading, sell, clients, handleChange }) => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = () => {};
  const { client, delivery_cost, total_payment, _id } = sell;
  return (
    <Card>
      {loading ? (
        <Loader />
      ) : (
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group md="4" as={Col} controlId="formGridEmail">
                <Form.Label>Client</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={client}
                  name="client"
                  required
                  as="select"
                >
                  <option value="">Select a Client</option>
                  {clients.map((client) => {
                    return <option value={client._id}>{client.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group md="4" as={Col} controlId="formGridEmail">
                <Form.Label>Delivery Cost</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={delivery_cost}
                  name="delivery_cost"
                  required
                  type="number"
                />
              </Form.Group>
              <Form.Group md="4" as={Col} controlId="formGridPassword">
                <Form.Label>Total Payment</Form.Label>
                <Form.Control
                  value={total_payment}
                  onChange={handleChange}
                  name="total_payment"
                  required
                  type="number"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group md="4" as={Col} controlId="formGridEmail">
                <Button>Add Items</Button>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              {_id ? "Update" : "Save"}
            </Button>
            <Link to="/sells" className="btn btn-danger ml-3">
              Cancel
            </Link>
          </Form>
        </Card.Body>
      )}
    </Card>
  );
};
