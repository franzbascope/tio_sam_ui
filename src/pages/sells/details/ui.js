import React from "react";
import { Alert } from "react-bootstrap";
import Loader from "../../../shared/loader";
import BreadCrumbs from "../../../shared/breadCrumbs";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default ({ sells, loading }) => {
  if (loading) return <Loader />;
  if (sells.length < 1)
    return <Alert variant="warning">No Sells registered, Regist One !!</Alert>;
  return (
    <React.Fragment>
    <BreadCrumbs />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sells.map((sell) => {
            const { product, subtotal, price, quantity } = sell;
            return (
              <tr>
                <td>{product.name}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{subtotal}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to="/sells" className="btn btn-danger mt-3">
        Go Back
      </Link>
    </React.Fragment>
  );
};
