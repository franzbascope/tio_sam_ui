import React, { useState, useEffect } from "react";
import * as Methods from "../../../shared/methods";
import { sellUrl, clientUrl, productsUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../../shared/messages";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Form from "./form";

export default () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [sell, setSell] = useState({
    client: "",
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

  const save = async (request) => {
    let response = await requestHandler(
      Methods.POST,
      sellUrl,
      request,
      null,
      "Sell saved successfully"
    );
    if (response) {
      history.push("/sells");
    }
  };
  const update = async (request) => {
    let response = await requestHandler(
      Methods.PUT,
      sellUrl,
      request,
      request._id,
      "Sell updated successfully"
    );
    if (response) {
      history.push("/products");
    }
  };
  let { id: sellId } = useParams();

  useEffect(() => {
    const getSell = async () => {
      let response = await requestHandler(Methods.EDIT, sellUrl, null, sellId);
      if (response) setSell(response.data);
    };
    const getClients = async () => {
      let response = await requestHandler(Methods.GET, clientUrl);
      if (response) setClients(response.data);
    };
    const getProducts = async () => {
      let response = await requestHandler(Methods.GET, productsUrl);
      if (response) setProducts(response.data);
    };
    getClients();
    getProducts();
    if (sellId && sellId != "new") {
      getSell();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSell({ ...sell, [name]: value });
  };

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setSell({ ...sell, [name]: value });
  };

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Form
        loading={globalValues.loading}
        save={(sell) => {
          save(sell);
        }}
        update={(sell) => {
          update(sell);
        }}
        handleChange={(e) => {
          handleChange(e);
        }}
        handleDetailChange={(e) => {
          handleDetailChange(e);
        }}
        sell={sell}
        clients={clients}
        products={products}
      />
    </React.Fragment>
  );
};
