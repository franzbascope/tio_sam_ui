import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ products, deleteProduct }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { price, weight, cost, name, _id } = product;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>{weight}</td>
                <td>{cost}</td>
                <td>
                  <Button variant="success" className="ml-3 mr-3">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteProduct(_id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
