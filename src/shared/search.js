import React, { useState } from "react";
import {
  Form,
  Col,
  Button,
  InputGroup,
  Accordion,
  Card,
} from "react-bootstrap";

export default ({ fields, submit }) => {
  const [filters, setFilter] = useState(fields);
  const operators = ["<", ">", "="];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filters, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let query = "";
    let sep = "";
    for (let key in filters) {
      let element = filters[key];
      if (element.operator && element.value) {
        query += `${sep}${key}=${element.operator}${element.value}`;
        sep = "&";
      } else if (element.value) {
        query += `${sep}${key}==/${element.value}/`;
        sep = "&";
      }
    }
    submit(query);
  };

  return (
    <Accordion className="mb-2" defaultActiveKey="-1">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <Button size="sm" variant="outline-primary">
            Show advanced search
          </Button>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {" "}
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center">
                {fields.map((fieldObject) => {
                  const { name, type, label } = fieldObject;
                  return (
                    <React.Fragment>
                      {type == "number" ? (
                        <Col className="mt-3" md={2} key={name}>
                          <Form.Label>Operator</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleChange}
                            name={name}
                          >
                            {operators.map((operator) => {
                              return (
                                <option key={operator} value={operator}>
                                  {operator}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      ) : (
                        ""
                      )}
                      <Col className="mt-3" md={4} key={name}>
                        <Form.Label>{label}</Form.Label>
                        <Form.Control
                          key={name}
                          onChange={handleChange}
                          name={name}
                          type={type}
                        />
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Form.Row>
              <Button className="mt-3" type="submit">
                Search
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
