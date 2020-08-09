import React from "react";
import { Alert } from "react-bootstrap";
import Loader from "../../shared/loader";
import { Table, Button } from "react-bootstrap";
export default ({ sells, loading, edit, deletes, detail }) => {
  if (loading) return <Loader />;
  if (sells.length < 1)
    return <Alert variant="warning">No Sells registered, Regist One !!</Alert>;
  return (
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
        {sells.map((sell) => {
          const { client, created_at, delivery_cost, total, _id } = sell;
          return (
            <tr>
              <td>{client.name}</td>
              <td>{created_at}</td>
              <td>{delivery_cost}</td>
              <td>{total}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    detail(_id);
                  }}
                >
                  Details
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    edit(_id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="mr-3"
                  variant="danger"
                  onClick={() => {
                    deletes(_id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
    </Table>
  );
};
