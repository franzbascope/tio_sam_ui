import React, { useEffect, useState } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../configuration/index";

export default () => {
  const [inputValues, setValues] = useState({
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res = await axios.get(`${API_URL}/products`);
        setValues({ ...inputValues, products: res.data.data });
      } catch (e) {
        alert("Error al obtener datos" + e);
      }
    };
    getProducts();
  });

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
      </Breadcrumb>
      <Button variant="primary" className="mt-3 mb-3">
        New Product
      </Button>
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
            {inputValues.products.map((product, key) => {
              const { price, weight, cost, name } = product;
              return (
                <tr key>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{weight}</td>
                  <td>{cost}</td>
                  <td>
                    <Button variant="success" className="ml-3 mr-3">
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};
