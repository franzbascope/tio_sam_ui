import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Loader from "../../../shared/loader";
import * as Methods from "../../../shared/methods";
import { productsUrl, buysUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../../shared/messages";
import { useHistory, useParams } from "react-router-dom";
import ProductsModal from "./modalProducts";
import BuyForm from "./form";
import moment from 'moment';

export default () => {
  const [validated, setValidated] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [buy, setBuy] = useState({
    payment_type: "",
    location: "",
    taxes: 0.0,
    date: "",
    products: [],
    _id: null,
  });

  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const paymentTypes = ["BNB_VISA_CARD_BOLIVIA", "PNC_CARD_USA"];
  const locations = ["COSTCO_STORE", "COSTCO_ONLINE"];

  const saveBuy = async () => {
    let request = buy;
    let response = await requestHandler(
      Methods.POST,
      buysUrl,
      request,
      null,
      "Buy saved successfully"
    );
    if (response) {
      history.push("/buys");
    }
  };
  const updateProduct = async (request) => {
    let response = await requestHandler(
      Methods.PUT,
      buysUrl,
      request,
      request._id,
      "Buy updated successfully"
    );
    if (response) {
      history.push("/buys");
    }
  };

  let { id: buysId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      let response = await requestHandler(Methods.GET, productsUrl);
      if (response) setAllProducts(response.data);
    };
    const getBuys = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        buysUrl,
        null,
        buysId
      );
      let data = response.data;
      if (data) setBuy({ ...data, date: moment(data.date).utc().format("YYYY-MM-DD") });
    };

    if (buysId && buysId != "new") {
      getBuys();
    }
    getProduct();
  }, []);

  // some comment over here

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
          setModalVisible(false);
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
                deleteProduct={(productId) => {
                  setBuy({
                    ...buy,
                    products: buy.products.filter((mapProduct) => {
                      return mapProduct._id != productId;
                    }),
                  });
                }}
                products={buy.products}
                form={buy}
                handleChange={(event) => {
                  const { name, value } = event.target;
                  setBuy({ ...buy, [name]: value });
                }}
                validated={validated}
                handleSubmit={(event) => {
                  event.preventDefault();
                  setValidated(true);
                  const form = event.currentTarget;
                  if (form.checkValidity() === false) {
                    event.stopPropagation();
                    return;
                  } else {
                    if (buy.products.length < 1) {
                      alert("You need to add at least one product");
                      return;
                    }
                    if (buy._id) updateProduct(buy);
                    else saveBuy();
                  }
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
