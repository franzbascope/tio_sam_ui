import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import { Alert } from "react-bootstrap";
import Messages from "../../shared/messages";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import Loader from "../../shared/loader";
import * as Methods from "../../shared/methods";
import { clientUrl } from "../../shared/urls";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default () => {
  const [inputValues, setValues] = useState({
    clients: [],
  });

  const requestHandler = mainHandler();
  const [globalValues] = useGlobal();
  const history = useHistory();

  useEffect(() => {
    async function fetchClients() {
      let res = await requestHandler(Methods.GET, clientUrl);
      if (res) setValues({ ...inputValues, clients: res.data });
    }
    fetchClients();
  }, []);

  const deleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await requestHandler(
        Methods.DELETE,
        clientUrl,
        null,
        id,
        "Client deleted successfully"
      );
      let clients = inputValues.clients.filter((client) => {
        return client._id != id;
      });
      setValues({
        ...inputValues,
        clients,
      });
    }
  };

  const editClient = (id) => {
    history.push(`/clients/${id}`);
  };

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/clients/new">
        New Client
      </Link>
      <Messages />
      {globalValues.loading ? (
        <Loader />
      ) : inputValues.clients.length > 0 ? (
        <Table
          clients={inputValues.clients}
          editClient={(id) => {
            editClient(id);
          }}
          deleteClient={(id) => {
            deleteClient(id);
          }}
        />
      ) : (
        <Alert variant="warning">No clients registered, Add one !!!</Alert>
      )}
    </React.Fragment>
  );
};
