import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../shared/breadCrumbs";
import { parseFormToObject } from "../../utils/parseForm";
import Loader from "../../shared/loader";
import * as Methods from "../../shared/methods";
import { productsUrl } from "../../shared/urls";
import mainHandler from "../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import { useHistory, useParams } from "react-router-dom";

export default () => {
  const [validated, setValidated] = useState(false);
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      let request = parseFormToObject(event);
      saveProduct(request);
    }
  };

  const saveProduct = async (request) => {
    let response = await requestHandler(
      Methods.POST,
      productsUrl,
      request,
      null,
      "Product saved successfully"
    );
    if (response) {
      history.push("/products");
    }
  };
  let { id: productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        productsUrl,
        null,
        productId
      );
      debugger;
      console.log(response);
    };

    if (productId) {
      getProduct();
    }
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Card>
        {globalValues.loading ? (
          <Loader />
        ) : (
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" required type="text" />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Cost $</Form.Label>
                  <Form.Control
                    name="cost"
                    required
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridPassword">
                  <Form.Label>Weight Gr</Form.Label>
                  <Form.Control name="weight" required type="number" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Price Bs</Form.Label>
                  <Form.Control name="price" required type="text" />
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
        )}
      </Card>
    </React.Fragment>
  );
};
