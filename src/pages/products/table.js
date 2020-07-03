import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ products, deleteProduct, editProduct }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost $</th>
            <th>Cost Bs</th>
            <th>Price Bs</th>
            <th>Weight</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { price, weight, cost, name, _id } = product;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{cost} $</td>
                <td>{parseInt(cost * 6.97)} Bs</td>
                <td>{price} Bs</td>
                <td>{weight} gr</td>

                <td>
                  <Button
                    variant="success"
                    className="ml-3 mr-3"
                    onClick={() => {
                      editProduct(_id);
                    }}
                  >
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
