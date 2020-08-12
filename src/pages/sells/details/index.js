import React, { useState, useEffect } from "react";
import * as Methods from "../../../shared/methods";
import { sellUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import { useParams } from "react-router-dom";
import DetailsUI from "./ui";
export default () => {
  const [sell, setSell] = useState({
    client:"", 
    created_at:"",
    delivery_cost:0,
    total:0,
    details:""
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();

  let { id: sellId } = useParams();

  useEffect(() => {
    const getSell = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        sellUrl,
        null,
        sellId
      );
      let sell = response.data;
      delete sell._id;
      delete sell.__v;
      debugger;
      if (response) setSell(sell);
    };
    getSell();
  }, []);
  return <DetailsUI sells={sell.details} loading={globalValues.loading} />;
};
