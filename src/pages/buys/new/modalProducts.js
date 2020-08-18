import React, { useState } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";

export default ({ products, save, show, hide }) => {
  const [values, setValues] = useState({
    validated: false,
    products: [],
    form: {
      cost_dollars: "",
      quantity: 1,
      product: "",
    },
  });
  const getProductOptions = () => {
    return products.map((product) => {
      return <option value={product._id}>{product.name}</option>;
    });
  };

  const validateProduct = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValues({ ...values, validated: true });
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    } else {
      let product = getProductById(values.form.product);
      const { quantity, cost_dollars } = values.form;
      let saveProduct = {
        ...product,
        company: product.company._id,
        product: product._id,
        quantity,
        cost_dollars,
      };
      setValues({
        ...values,
        form: {
          cost_dollars: "",
          quantity: 1,
          product: "",
        },
      });
      save(saveProduct);
    }
  };

  const { quantity_lots, quantity_units, cost_dollars, product } = values.form;
  const getProductById = (productId) => {
    return products.filter((mapProduct) => {
      return mapProduct._id == productId;
    })[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      form: { ...values.form, [name]: value },
    });
  };

  const handleLotsChange = (event) => {
    const lot = event.target.value;
    const product = getProductById(values.form.product);
    setValues({
      ...values,
      form: { ...values.form, quantity_lots: lot },
    });
    if (product)
      setValues({
        ...values,
        form: { ...values.form, quantity_units: lot * product.lot },
      });
  };

  return (
    <Modal size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Products</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          validated={values.validated}
          onSubmit={validateProduct}
        >
          <Form.Row>
            <Form.Group md="4" as={Col} controlId="formGridEmail">
              <Form.Label>Products</Form.Label>
              <Form.Control
                onChange={(event) => {
                  const product = getProductById(event.target.value);
                  setValues({
                    ...values,
                    form: {
                      ...values.form,
                      cost_dollars: product.cost_dollars,
                      product: product._id,
                    },
                  });
                }}
                value={product}
                name="product"
                required
                as="select"
              >
                <option value="">Select a product</option>
                {getProductOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group md="4" as={Col} controlId="formGridEmail">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={cost_dollars}
                name="cost_dollars"
                required
                type="number"
              />
            </Form.Group>
            <Form.Group md="4" as={Col} controlId="formGridEmail">
              <Form.Label>Quantity Lots</Form.Label>
              <Form.Control
                onChange={handleLotsChange}
                value={quantity_lots}
                name="quantity_lots"
                required
                type="number"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md="4" as={Col} controlId="formGridEmail">
              <Form.Label>Quantity Units</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={quantity_units}
                name="quantity_units"
                required
                type="number"
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" className="ml-3" onClick={hide}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
