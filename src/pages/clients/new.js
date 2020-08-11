import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../shared/breadCrumbs";
import Loader from "../../shared/loader";
import * as Methods from "../../shared/methods";
import { clientUrl, buysUrl } from "../../shared/urls";
import mainHandler from "../../shared/requestHandler";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import { useHistory, useParams } from "react-router-dom";

export default () => {
  const [validated, setValidated] = useState(false);
  const [client, setClient] = useState({
    name: "",
    city: "",
    _id: "",
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (client._id) updateClient(client);
      else saveClient(client);
    }
  };

  const saveClient = async (request) => {
    delete request._id;
    let response = await requestHandler(
      Methods.POST,
      clientUrl,
      request,
      null,
      "Client saved successfully"
    );
    if (response) {
      history.push("/clients");
    }
  };
  const updateClient = async (request) => {
    let response = await requestHandler(
      Methods.PUT,
      clientUrl,
      request,
      request._id,
      "Client updated successfully"
    );
    if (response) {
      history.push("/clients");
    }
  };
  let { id: clientId } = useParams();

  useEffect(() => {
    const getClient = async () => {
      let response = await requestHandler(
        Methods.EDIT,
        clientUrl,
        null,
        clientId
      );
      if (response) setClient(response.data);
    };
    if (clientId && clientId != "new") {
      getClient();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const { name, _id, city, cellphone_number } = client;
  const cities = ["SCZ", "CBBA"];
  const getCityOptions = () => {
    return cities.map((city) => {
      return <option value={city}>{city}</option>;
    });
  };
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Card>
        {globalValues.loading ? (
          <Loader />
        ) : (
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={name}
                    name="name"
                    required
                    type="text"
                  />
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={city}
                    name="city"
                    required
                    as="select"
                  >
                    <option value="">Select a city</option>
                    {getCityOptions()}
                  </Form.Control>
                </Form.Group>
                <Form.Group md="4" as={Col} controlId="formGridEmail">
                  <Form.Label>Cellphone Number</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={cellphone_number}
                    name="cellphone_number"
                    type="text"
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                {_id ? "Update" : "Save"}
              </Button>
              <Link to="/clients" className="btn btn-danger ml-3">
                Cancel
              </Link>
            </Form>
          </Card.Body>
        )}
      </Card>
    </React.Fragment>
  );
};
