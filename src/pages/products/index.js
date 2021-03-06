import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import { Alert } from "react-bootstrap";
import Messages from "../../shared/messages";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import Loader from "../../shared/loader";
import Pagination from "../../shared/paginate";
import * as Methods from "../../shared/methods";
import { productsUrl } from "../../shared/urls";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Search from "../../shared/search";
import { filter } from "./filters";
export default () => {
  const [inputValues, setValues] = useState({
    products: [],
  });

  const requestHandler = mainHandler();
  const [globalValues, setGlobalValues] = useGlobal();
  const history = useHistory();

  const fetchProducts = async (page, query="") => {
    let res = await requestHandler(Methods.PAGE, productsUrl, null, page,"",query);
    if (res) setValues({ ...inputValues, products: res.data.response });
  };

  useEffect(() => {
    fetchProducts(null);
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

  const editProduct = (id) => {
    history.push(`/products/${id}`);
  };

  const productsDetail = (id) => {
    history.push(`/products/detail/${id}`);
  };


  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/products/new">
        New Product
      </Link>
      <Search
        fields={filter}
        submit={(query) => {
            setGlobalValues({...globalValues, currentPage: 1})
            fetchProducts(globalValues.currentPage, query);
        }}
      />
      <Messages />
      {globalValues.loading ? (
        <Loader />
      ) : inputValues.products.length > 0 ? (
        <React.Fragment>
          <Table
            products={inputValues.products}
            productsDetail={(id) => {
              productsDetail(id);
            }}
            editProduct={(id) => {
              editProduct(id);
            }}
            deleteProduct={(id) => {
              deleteProduct(id);
            }}
          />
          <Pagination fetchData={fetchProducts}/>
        </React.Fragment>
      ) : (
        <Alert variant="warning">No products registered, Add one !!!</Alert>
      )}
    </React.Fragment>
  );
};
