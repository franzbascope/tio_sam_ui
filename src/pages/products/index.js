import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../configuration/index";
import Table from "./table";

export default () => {
  const [inputValues, setValues] = useState({
    products: [],
    error: null,
    success: null,
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res = await axios.get(`${API_URL}/products`);
        setValues({ ...inputValues, products: res.data.data });
      } catch (e) {
        setValues({ inputValues, error: "Errot fetching products: " + e });
      }
    };
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`${API_URL}/products/${id}`);
        let products = inputValues.products.filter((product) => {
          return product._id != id;
        });
        setValues({
          ...inputValues,
          products,
          success: "Product deleted successfuly: ",
        });
      }
    } catch (e) {
      setValues({ inputValues, error: "Error deleting product: " + e });
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
      {inputValues.error ? (
        <Alert
          onClose={() =>
            setValues({ ...inputValues, success: null, error: null })
          }
          className="mt-3 mb-3"
          dismissible
          variant="danger"
        >
          {inputValues.error}
        </Alert>
      ) : (
        ""
      )}

      {inputValues.success ? (
        <Alert
          onClose={() =>
            setValues({ ...inputValues, success: null, error: null })
          }
          className="mt-3 mb-3"
          dismissible
          variant="success"
        >
          {inputValues.success}
        </Alert>
      ) : (
        ""
      )}
      {inputValues.products.length > 0 ? (
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
