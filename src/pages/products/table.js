import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ products, deleteProduct, editProduct, productsDetail }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Items / Lot</th>
            <th>Cost Dollars</th>
            <th>Total Cost Bs</th>
            <th>Price Unit Bs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const {
              lot,
              price_bs,
              cost_dollars,
              name,
              _id,
              total_cost_bs,
            } = product;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{lot}</td>
                <td>{cost_dollars} usd</td>
                <td>{total_cost_bs.toFixed(2)} Bs</td>
                <td>{price_bs} Bs</td>
                <td style={{ minWidth: "200px" }}>
                  <Button
                    variant="primary"
                    className="ml-3 mr-3"
                    onClick={() => {
                      productsDetail(_id);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="success"
                    className="mr-3"
                    onClick={() => {
                      editProduct(_id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="mr-3"
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
