import React, { useState, useEffect } from "react";
import * as Methods from "../../../shared/methods";
import { importationUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import { useParams } from "react-router-dom";
import DetailsUI from "./ui";
export default () => {
  const [importation, setImportation] = useState({
    state: "",
    arrival_date: "",
    departure_date: "",
    shipping_real_kg: 0.0,
    _id: null,
    buys: [],
    storage: "",
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();

  let { id: importationId } = useParams();

  useEffect(() => {
    console.log(importationId);
    const getImportation = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        importationUrl,
        null,
        importationId
      );
      let importation = response.data;
      importation.buys = importation.buys.length;
      importation.storage = importation.storage.name;
      delete importation._id;
      delete importation.__v;
      debugger;
      if (response) setImportation(importation);
    };
    getImportation();
  }, []);
  return <DetailsUI importation={importation} loading={globalValues.loading} />;
};
