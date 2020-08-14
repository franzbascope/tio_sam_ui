import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ storages, deleteStorages, editStorages }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuantity of products</th>
            <th>Cuantity of importations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storages.map((storage) => {
            const { _id, name, products_storage, importations } = storage;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{products_storage.length}</td>
                <td>{importations.length}</td>
                <td>
                  <Button
                    variant="success"
                    className="ml-3 mr-3"
                    onClick={() => {
                      editStorages(_id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteStorages(_id);
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
