import React from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductsTable from "./table";
export default ({
  handleChange,
  validated,
  handleSubmit,
  locations,
  paymentTypes,
  setModalVisible,
  form,
  products,
  deleteProduct,
}) => {
  const getLocationOptions = () => {
    return locations.map((location) => {
      return <option value={location}>{location}</option>;
    });
  };
  const getPaymentOptions = () => {
    return paymentTypes.map((payment) => {
      return <option value={payment}>{payment}</option>;
    });
  };

  const { payment_type, taxes, _id, location, date } = form;

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={date}
            name="date"
            required
            type="date"
          />
        </Form.Group>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Payment Type</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={payment_type}
            name="payment_type"
            required
            as="select"
          >
            <option value="">Select a payment type</option>
            {getPaymentOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={location}
            name="location"
            required
            as="select"
          >
            <option value="">Select a location</option>
            {getLocationOptions()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Taxes</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={taxes}
            name="taxes"
            required
            type="number"
          />
        </Form.Group>
        <Form.Group md="4" as={Col}>
          <Button
            className="m-4"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Add Products
          </Button>
        </Form.Group>
      </Form.Row>
      {products.length > 0 ? (
        <ProductsTable products={products} deleteProduct={deleteProduct} />
      ) : (
        <Alert variant="warning">No products registered yet</Alert>
      )}

      <Button variant="primary" type="submit">
        {_id ? "Update" : "Save"}
      </Button>
      <Link to="/buys" className="btn btn-danger ml-3">
        Cancel
      </Link>
    </Form>
  );
};
