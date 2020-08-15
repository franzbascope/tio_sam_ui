import React from "react";
import { Form, Col, Button } from "react-bootstrap";

export default ({ fields, submit }) => {
  const operators = ["<", ">", "="];
  return (
    <Form>
      <Form.Row className="align-items-center">
        {fields.map((fieldObject) => {
          const { name, type, label } = fieldObject;
          return (
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly></Form.Label>
              <Form.Control
                name={name}
                type={type}
                className="mb-2"
                id="inlineFormInput"
                placeholder={label}
              />
              {type == "number" ? (
                <Form.Control as="select">
                  {operators.map((operator) => {
                    return <option value={operator}>{operator}</option>;
                  })}
                </Form.Control>
              ) : (
                ""
              )}
            </Col>
          );
        })}
        <Button
          type="submit"
          onClick={() => {
            //obtener los valores
            submit("values");
          }}
          className="mb-2"
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  );
};
