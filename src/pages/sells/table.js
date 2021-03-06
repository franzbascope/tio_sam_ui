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
          <th>Date created</th>
          <th>Delivery Cost</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sells.map((sell) => {
          const { client, created_at, delivery_cost, total, _id } = sell;
          return (
            <tr key={_id} >
              <td>{client.name}</td>
              <td>{created_at}</td>
              <td>{delivery_cost}</td>
              <td>{total}</td>
              <td>
                <Button
                  className="ml-3 mr-3"
                  variant="primary"
                  onClick={() => {
                    detail(_id);
                  }}
                >
                  Details
                </Button>
                <Button
                  className="mr-3"
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
      </tbody>
    </Table>
  );
};
