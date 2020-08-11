import React, { useState } from "react";
import { Form, Button, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../../shared/loader";
import Table from "./details/table";

export default ({
  loading,
  sell,
  clients,
  handleChange,
  showModal,
  deleteDetail,
  save,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      save();
    }
  };

  const getTotal = (details) => {
    let total = 0;
    for (let detail of details) {
      total += detail.subtotal;
    }
    return total;
  };

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
                  {clients.map((client, key) => {
                    return (
                      <option key={key} value={client._id}>
                        {client.name}
                      </option>
                    );
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
                <Button
                  onClick={() => {
                    showModal();
                  }}
                >
                  Add Items
                </Button>
              </Form.Group>
            </Form.Row>
            <Table
              details={sell.details}
              deletes={(id) => {
                deleteDetail(id);
              }}
            />
            <Alert variant="info" className="mt-3">
              Total: {getTotal(sell.details)}
            </Alert>
            <div className="mt-4">
              <Button variant="primary" type="submit">
                {_id ? "Update" : "Save"}
              </Button>
              <Link to="/sells" className="btn btn-danger ml-3">
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      )}
    </Card>
  );
};
