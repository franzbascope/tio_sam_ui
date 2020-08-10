import React, { useState } from "react";
import { Modal, Card, Form, Button, Col } from "react-bootstrap";

export default ({ products, close, show, add }) => {
  const [validated, setValidated] = useState(false);
  const [detail, setDetail] = useState({
    product: "",
    quantity: 1,
    price: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      add(detail);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };
  const handleProductsChange = (e) => {
    let product = JSON.parse(e.target.value);
    setDetail({ ...detail, price: product.price_bs, product: e.target.value });
  };
  const { product, price, quantity } = detail;

  return (
    <Modal size="lg" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    onChange={handleProductsChange}
                    value={product}
                    name="product"
                    required
                    as="select"
                  >
                    <option value="">Select a Product</option>
                    {products.map((product, index) => {
                      return (
                        <option key={index} value={JSON.stringify(product)}>
                          {product.name}
                        </option>
                      );
                    })}
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
                <Form.Group md="4" as={Col} controlId="formGridPassword">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    value={quantity}
                    onChange={handleChange}
                    name="quantity"
                    required
                    type="number"
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit" className="mr-3">
                Save
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  close();
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
