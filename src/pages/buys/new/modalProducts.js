import React, { useState } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";

export default ({ products, save, show, hide }) => {
  const [values, setValues] = useState({
    show: false,
    validated: false,
    products: [],
    form: {
      price: "",
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
      let product = {
        ...values.form,
        product: getProductById(values.form.product),
      };
      save(product);
    }
  };

  const { quantity, price, product } = values.form;
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
                      price: product.price_bs,
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={price}
                name="price"
                required
                type="number"
              />
            </Form.Group>
            <Form.Group md="4" as={Col} controlId="formGridEmail">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={quantity}
                name="quantity"
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
