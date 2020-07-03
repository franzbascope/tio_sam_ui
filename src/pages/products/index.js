import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Alert, Spinner } from "react-bootstrap";
import Messages from "../../shared/messages";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import mainState from "../../shared/mainState";
import * as Methods from "../../shared/methods";
import { productsUrl } from "../../shared/urls";
export default () => {
  const [inputValues, setValues] = useState({
    products: [],
  });
  const { inputValues: globalValues } = mainState();
  const requestHandler = mainHandler();

  useEffect(async () => {
    let res = await requestHandler(Methods.GET, productsUrl);
    setValues({ ...inputValues, products: res.data.data });
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await requestHandler(Methods.DELETE, productsUrl, null, id);
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
      <Breadcrumb>
        <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
      </Breadcrumb>
      <Button variant="primary" className="mt-3 mb-3">
        New Product
      </Button>
      <Messages />
      {globalValues.loading ? (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <br />
            <Spinner animation="border" variant="primary" />
          </div>
        </React.Fragment>
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
