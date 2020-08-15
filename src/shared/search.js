import React, { useState, useEffect } from "react";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { useGlobal } from "reactn";

export default ({ fields, submit }) => {
  const [filters, setFilter] = useState();
  const [globalValues, setGlobalValues] = useGlobal();
  const operators = ["<", ">", "="]
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    const datakey = event.currentTarget.getAttribute("datakey");
    const key = datakey.split("/");
    if(key[0] == name) key[0] = "value";
    setFilter({ ...filters, [name]: {...filters[name], [key[0]]:value} });
    
  };

  const setFilters = () => {
    fields.map( (field) => {
      //const { name, type } = field;
      //console.log(type);
      setFilter({...filters, [field.name]: {"type": field.type}})
    });
  }

  useEffect(() => {
    setGlobalValues({...globalValues, query: ""})
    setFilters();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = "";
    let sep = ""
    for (let key in filters) {
      let element = filters[key];
      if (element.operator && element.value) {
        query += `${sep}${key}=${element.operator}${element.value}`;
        sep = "&"
      } else if (element.value) {
        query += `${sep}${key}==/${element.value}/`;
        sep = "&"
      }
    }
    setGlobalValues({...globalValues, query: query})
    submit(query);
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className="align-items-center">
        {fields.map((fieldObject) => {
          const { name, type, label } = fieldObject;
          return (
            <Col xs="auto" key={name}>
              <InputGroup.Prepend>
                {type == "number" ? (
                  <Form.Control as="select" onChange={handleChange} datakey={`operator/${name}`} key={`operator/${name}`} name={name}>
                    <option value="">Select operator</option>
                    {operators.map((operator) => {
                      return <option key={operator} value={operator}>{operator}</option>;
                    })}
                  </Form.Control>
                ) : (
                  ""
                )}
                <Form.Control 
                  key={name}
                  datakey={name}
                  onChange={handleChange}
                  name={name}
                  type={type}
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder={label}
                />
              </InputGroup.Prepend>
            </Col>
          );
        })}
        <Button
          type="submit"
          className="mb-2"
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  );
};