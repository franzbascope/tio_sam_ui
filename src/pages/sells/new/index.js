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
    request.details.map(detail => {
      delete detail._id;
    })
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
    request.details.map(detail => {
      if(typeof detail._id == "number") delete detail._id;
    });
    let response = await requestHandler(
      Methods.PUT,
      sellUrl,
      request,
      request._id,
      "Sell updated successfully"
    );
    if (response) {
      history.push("/sells");
    }
  };
  let { id: sellId } = useParams();

  useEffect(() => {
    const getSell = async () => {
      let response = await requestHandler(Methods.EDIT, sellUrl, null, sellId);
      if (response) setSell(response.data);
    };
    const getClients = async () => {
      let response = await requestHandler(Methods.PAGE, clientUrl, null, 1);
      if (response) setClients(response.data.response);
    };
    const getProducts = async () => {
      let response = await requestHandler(Methods.PAGE, productsUrl, null, 1);
      if (response) setProducts(response.data.response);
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
        update={() => {
          update(sell);
        }}
        handleChange={(e) => {
          handleChange(e);
        }}
        deleteDetail={(id) => {
          if (window.confirm("Are you sure you want to delete this is item?")) {
            setSell({
              ...sell,
              details: sell.details.filter((detail) => {
                return detail._id !== id;
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
          detail._id = new Date().getUTCMilliseconds();
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
