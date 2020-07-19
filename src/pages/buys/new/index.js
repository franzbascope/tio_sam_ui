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
import BuyForm from "./form";
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
            <BuyForm
              form={buy}
              handleChange={(event) => {
                const { name, value } = event.target;
                setBuy({ ...buy, [name]: value });
              }}
              validated={validated}
              handleSubmit={(event) => {
                event.preventDefault();
                setValidated(true);
              }}
              locations={locations}
              paymentTypes={paymentTypes}
              setModalVisible={() => {
                setModalVisible(true);
              }}
            />
          </Card.Body>
        )}
      </Card>
    </React.Fragment>
  );
};
