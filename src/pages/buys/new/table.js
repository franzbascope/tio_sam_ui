import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ products, deleteProduct }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr>
              <td>{product.name}</td>
              <td>{product.cost_dollars}</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wanna delete this is item?"
                      )
                    )
                      deleteProduct(product._id);
                  }}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
