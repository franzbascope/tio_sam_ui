import React, { useState, useEffect } from "react";
import * as Methods from "../../../shared/methods";
import { productsUrl } from "../../../shared/urls";
import mainHandler from "../../../shared/requestHandler";
import { useGlobal } from "reactn";
import { useParams } from "react-router-dom";
import DetailsUI from "./ui";
export default () => {
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

  let { id: productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        productsUrl,
        null,
        productId
      );
      let product = response.data;
      product.company = product.company.name;
      delete product._id;
      delete product.__v;
      debugger;
      if (response) setProduct(product);
    };
    getProduct();
  }, []);
  return <DetailsUI product={product} loading={globalValues.loading} />;
};
