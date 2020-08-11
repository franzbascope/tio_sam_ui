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
    price_bs: 0,
    price_wholesale_bs: 0,
    cost_dollars: 0,
    weight: 0,
    _id: null,
    company: "",
    lot: "",
    price_lot_bs: "",
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
    debugger;
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

  const handleChangeProductsChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const {
    name,
    price_bs,
    cost_dollars,
    weight,
    _id,
    company,
    price_wholesale_bs,
    lot,
    price_lot_bs,
  } = product;

  const getCompanyOptions = () => {
    return companies.map((mapCompany) => {
      return (
        <option value={mapCompany._id} required={mapCompany._id == company}>
          {mapCompany.name}
        </option>
      );
    });
  };
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
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={company}
                    name="company"
                    required
                    as="select"
                  >
                    <option value="">Select a Company</option>
                    {getCompanyOptions()}
                  </Form.Control>
                </Form.Group>
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
                  <Form.Label>Cost USD</Form.Label>
                  <Form.Control
                    value={cost_dollars}
                    onChange={handleChange}
                    name="cost_dollars"
                    required
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Price Bolivia Bs</Form.Label>
                  <Form.Control
                    value={price_bs}
                    onChange={handleChange}
                    name="price_bs"
                    required
                    type="number"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Price Wholesale Bs</Form.Label>
                  <Form.Control
                    value={price_wholesale_bs}
                    onChange={handleChange}
                    name="price_wholesale_bs"
                    required
                    type="number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Price Lot BS</Form.Label>
                  <Form.Control
                    value={price_lot_bs}
                    onChange={handleChange}
                    name="price_lot_bs"
                    required
                    type="number"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Lot (Items per box)</Form.Label>
                  <Form.Control
                    value={lot}
                    onChange={handleChange}
                    name="lot"
                    required
                    type="number"
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
