import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ importations, deleteImportation, edit }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha Salida</th>
            <th>Estado</th>
            <th>Valor $</th>
            <th>Peso Kg</th>
            <th>Costo Envio $</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {importations.map((importation) => {
            const {
              _id,
              departure_date,
              state,
              value_dollars,
              shipping_real_kg,
              shipping_cost_dollars,
            } = importation;
            return (
              <tr key={_id}>
                <td>{departure_date}</td>
                <td>{departustatere_date}</td>
                <td>{value_dollars.toFixed(2)} $ </td>
                <td>{shipping_real_kg.toFixed(2)} Kg</td>
                <td>{shipping_cost_dollars.toFixed(2)} $</td>
                <td>
                  <Button
                    variant="success"
                    className="ml-3 mr-3"
                    onClick={() => {
                      edit(_id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteImportation(_id);
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
