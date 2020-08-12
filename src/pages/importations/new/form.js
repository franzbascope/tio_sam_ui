import React from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
export default ({
  handleChange,
  validated,
  handleSubmit,
  storages,
  form,
  buys,
  addBuy,
}) => {
  const getBuyOptions = () => {
    return buys.map((buy) => {
      return { label: buy.name, value: buy._id };
    });
  };

  const getStorageStateOptions = () => {
    return storages.map((storage) => {
      return (
        <option key={storage._id} value={storage._id}>
          {storage.name}
        </option>
      );
    });
  };

  const { _id, arrival_date, departure_date, shipping_real_kg } = form;

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Departure Date</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={departure_date}
            name="departure_date"
            required
            type="date"
          />
        </Form.Group>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Arrival Date</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={arrival_date}
            name="arrival_date"
            type="date"
          />
        </Form.Group>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Net Weight Kg</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={shipping_real_kg}
            name="shipping_real_kg"
            required
            type="number"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Buys</Form.Label>
          <MultiSelect
            options={getBuyOptions()}
            value={form.buys}
            onChange={(event) => {
              addBuy(event);
            }}
          />
        </Form.Group>
        <Form.Group md="4" as={Col} controlId="formGridEmail">
          <Form.Label>Storage</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={form.storage._id}
            name="storage"
            required
            as="select"
          >
            <option value="">Select a storage</option>
            {getStorageStateOptions()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        {_id ? "Update" : "Save"}
      </Button>
      <Link to="/importations" className="btn btn-danger ml-3">
        Cancel
      </Link>
    </Form>
  );
};
