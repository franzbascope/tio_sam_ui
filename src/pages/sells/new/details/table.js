import React from "react";
import { Table, Button, Alert, Card } from "react-bootstrap";
export default ({ details, deletes }) => {
  if (details.length < 1) {
    return (
      <Alert className="mt-3" variant="warning">
        No products added yet !!
      </Alert>
    );
  }
  return (
    <Card className="mt-3">
      <Card.Body>
        <h4 className="m-3">Products Added</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, key) => {
              const { product, price, quantity, id, subtotal } = detail;
              return (
                <tr key={key}>
                  <td>{product.name}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>{subtotal}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deletes(id);
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
      </Card.Body>
    </Card>
  );
};
