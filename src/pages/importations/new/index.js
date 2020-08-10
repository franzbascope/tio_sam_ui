import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Loader from "../../../shared/loader";
import * as Methods from "../../../shared/methods";
import { importationUrl, buysUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../../shared/messages";
import { useHistory, useParams } from "react-router-dom";
import Form from "./form";
import moment from "moment";

export default () => {
  const [validated, setValidated] = useState(false);
  const [allBuys, setAllBuys] = useState([]);
  const [importation, setImportation] = useState({
    state: "",
    arrival_date: "",
    departure_date: "",
    shipping_real_kg: 0.0,
    _id: null,
    buys: [],
  });

  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const paymentTypes = ["BNB_VISA_CARD_BOLIVIA", "PNC_CARD_USA"];
  const locations = ["COSTCO_STORE", "COSTCO_ONLINE"];

  const saveImportation = async () => {
    let request = {
      ...importation,
      buys: importation.buys.map((buy) => {
        return JSON.parse(buy.value);
      }),
    };
    let response = await requestHandler(
      Methods.POST,
      importationUrl,
      request,
      null,
      "Importation saved successfully"
    );
    if (response) {
      history.push("/importations");
    }
  };
  const updateImportation = async (request) => {
    request = {
      ...importation,
      buys: importation.buys.map((buy) => {
        return buy.value;
      }),
    };
    let response = await requestHandler(
      Methods.PUT,
      importationUrl,
      request,
      request._id,
      "Importation updated successfully"
    );
    if (response) {
      history.push("/importations");
    }
  };

  let { id: importationId } = useParams();

  useEffect(() => {
    const getBuys = async () => {
      let response = await requestHandler(Methods.GET, buysUrl);
      if (response) setAllBuys(response.data);
    };
    const getOneBuy = async (id) => {
      let response = await requestHandler(Methods.EDIT, buysUrl, null, id);
      let data = response.data;
      return data;
    };

    const getImportation = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        importationUrl,
        null,
        importationId
      );
      let data = response.data;
      if (data) {
        const list = [];
        await Promise.all(
          data.buys.map(async (buy) => {
            let newBuy = await getOneBuy(buy);
            list.push({ label: newBuy.name, value: buy });
          })
        );
        setImportation({
          ...data,
          arrival_date: moment(data.arrival_date).utc().format("YYYY-MM-DD"),
          departure_date: moment(data.departure_date)
            .utc()
            .format("YYYY-MM-DD"),
          buys: list,
        });
      }
    };
    if (importationId && importationId != "new") {
      getImportation();
    }
    getBuys();
  }, []);

  // some comment over here

  const shipmentStates = ["USA", "TRANSIT", "BO"];

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Card>
        {globalValues.loading ? (
          <Loader />
        ) : (
          <Card.Body>
            <Form
              shipmentStates={shipmentStates}
              deleteProduct={(productId) => {
                setImportation({
                  ...importation,
                  products: importation.buys.filter((mapBuy) => {
                    return mapBuy._id != productId;
                  }),
                });
              }}
              buys={allBuys}
              form={importation}
              addBuy={(buys) => {
                setImportation({
                  ...importation,
                  buys: buys,
                });
                console.log(buys);
              }}
              handleChange={(event) => {
                const { name, value } = event.target;
                setImportation({ ...importation, [name]: value });
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
                  if (importation.buys.length < 1) {
                    alert("You need to add at least one buy");
                    return;
                  }
                  if (importation._id) updateImportation(importation);
                  else saveImportation();
                }
              }}
              locations={locations}
              paymentTypes={paymentTypes}
            />
          </Card.Body>
        )}
      </Card>
    </React.Fragment>
  );
};
