import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ products, deleteProduct, editProduct }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Items / Lot</th>
            <th>Cost Dollars</th>
            <th>Price Bs</th>
            <th>Price Wholesale Bs</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const {
              lot,
              price_bs,
              weight,
              cost_dollars,
              name,
              _id,
              price_wholesale_bs,
            } = product;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{lot}</td>
                <td>{cost_dollars} usd</td>
                <td>{price_bs} Bs</td>
                <td>{price_wholesale_bs} Bs</td>
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
