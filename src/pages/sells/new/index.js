import React, { useState, useEffect } from "react";
import * as Methods from "../../../shared/methods";
import { sellUrl, clientUrl, productsUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../../shared/messages";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Form from "./form";
import DetailForm from "./details";

export default () => {
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [sell, setSell] = useState({
    client: "",
    delivery_cost: "",
    total_payment: 0,
    _id: null,
    delivery_price: "",
    details: [],
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const getClientById = (client_id, clients) => {
    return clients.filter((client) => {
      return client._id == client_id;
    })[0];
  };

  const save = async () => {
    if (sell.details.length < 1) {
      alert("Need to add at least one product");
      return;
    }
    let clientObject = getClientById(sell.client, clients);
    let request = sell;
    request.client = clientObject;
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

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Form
        showModal={() => {
          setShow(true);
        }}
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
        deleteDetail={(id) => {
          if (window.confirm()) {
            setSell({
              ...sell,
              details: sell.details.filter((detail) => {
                return detail.id !== id;
              }),
            });
          }
        }}
        sell={sell}
        clients={clients}
        products={products}
      />
      <DetailForm
        products={products}
        add={(detail) => {
          detail.product = JSON.parse(detail.product);
          detail.id = new Date().getUTCMilliseconds();
          detail.subtotal = detail.price * detail.quantity;
          setSell({
            ...sell,
            details: sell.details.concat(detail),
            total_payment: sell.total_payment + detail.subtotal,
          });
          setShow(false);
        }}
        show={show}
        close={() => {
          setShow(false);
        }}
      />
    </React.Fragment>
  );
};
