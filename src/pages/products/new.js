import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../shared/breadCrumbs";
import Loader from "../../shared/loader";
import * as Methods from "../../shared/methods";
import { productsUrl, companyUrl } from "../../shared/urls";
import mainHandler from "../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import { useHistory, useParams } from "react-router-dom";

export default () => {
  const [validated, setValidated] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    cost: "",
    weight: "",
    _id: null,
  });
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
      if (product._id) updateProduct(product);
      else saveProduct(product);
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
  const updateProduct = async (request) => {
    let response = await requestHandler(
      Methods.PUT,
      productsUrl,
      request,
      request._id,
      "Product updated successfully"
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
      if (response) setProduct(response.data);
    };
    const getCompanies = async () => {
      let response = await requestHandler(Methods.GET, companyUrl);
      if (response) setCompanies(response.data);
    };
    getCompanies();
    if (productId && productId != "new") {
      getProduct();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const { name, price, cost, weight, _id } = product;
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
                  <Form.Control
                    onChange={handleChange}
                    value={name}
                    name="name"
                    required
                    type="text"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Cost $</Form.Label>
                  <Form.Control
                    value={cost}
                    onChange={handleChange}
                    name="cost"
                    required
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridPassword">
                  <Form.Label>Weight Gr</Form.Label>
                  <Form.Control
                    value={weight}
                    onChange={handleChange}
                    name="weight"
                    required
                    type="number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Price Bs</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={handleChange}
                    name="price"
                    required
                    type="text"
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                {_id ? "Update" : "Save"}
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
