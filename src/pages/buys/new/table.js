import React from "react";
import { Table } from "react-bootstrap";

export default ({ products }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr>
              <td>{product.product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
