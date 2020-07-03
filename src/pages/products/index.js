import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import { Button, Alert } from "react-bootstrap";
import Messages from "../../shared/messages";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import Loader from "../../shared/loader";
import * as Methods from "../../shared/methods";
import { productsUrl } from "../../shared/urls";
import BreadCrumbs from "../../shared/breadCrumbs";
export default () => {
  const [inputValues, setValues] = useState({
    products: [],
  });

  const requestHandler = mainHandler();
  const [globalValues] = useGlobal();

  useEffect(() => {
    async function fetchProducts() {
      let res = await requestHandler(Methods.GET, productsUrl);
      setValues({ ...inputValues, products: res.data.data });
    }
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await requestHandler(
        Methods.DELETE,
        productsUrl,
        null,
        id,
        "Product deleted successfully"
      );
      let products = inputValues.products.filter((product) => {
        return product._id != id;
      });
      setValues({
        ...inputValues,
        products,
      });
    }
  };

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Button variant="primary" className="mt-3 mb-3">
        New Product
      </Button>
      <Messages />
      {globalValues.loading ? (
        <Loader />
      ) : inputValues.products.length > 0 ? (
        <Table
          products={inputValues.products}
          deleteProduct={(id) => {
            deleteProduct(id);
          }}
        />
      ) : (
        <Alert variant="warning">No products registered, Add one !!!</Alert>
      )}
    </React.Fragment>
  );
};
