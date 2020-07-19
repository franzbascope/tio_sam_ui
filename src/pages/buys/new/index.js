import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Loader from "../../../shared/loader";
import * as Methods from "../../../shared/methods";
import { productsUrl, companyUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../../shared/messages";
import { useHistory, useParams } from "react-router-dom";
import ProductsModal from "./modalProducts";
export default () => {
  const [validated, setValidated] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [buy, setBuy] = useState({
    date: "",
    payment_type: "",
    location: "",
    taxes: "",
    products: [],
    _id: null,
  });

  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const paymentTypes = ["BNB_VISA_CARD_BOLIVIA", "PNC_CARD_USA"];
  const locations = ["COSTCO_STORE", "COSTCO_ONLINE"];

  const handleSubmit = (event) => {
    // event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    //   setValidated(true);
    // } else {
    //   if (product._id) updateProduct(product);
    //   else saveProduct(product);
    // }
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

  useEffect(() => {
    const getProduct = async () => {
      let response = await requestHandler(Methods.GET, productsUrl);
      if (response) setAllProducts(response.data);
    };
    getProduct();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBuy({ ...buy, [name]: value });
  };

  const { date, payment_type, location, taxes, products, _id } = buy;

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
  return (
    <React.Fragment>
      <ProductsModal
        products={allProducts}
        show={isModalVisible}
        hide={() => {
          setModalVisible(false);
        }}
        save={(product) => {
          setBuy({ ...buy, products: buy.products.concat(product) });
        }}
      />
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
              </Form.Row>
              <Form.Row>
                <Form.Group md="4" as={Col}>
                  <Button
                    onClick={() => {
                      setModalVisible(true);
                    }}
                  >
                    Add Products
                  </Button>
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
