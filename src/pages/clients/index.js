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
import Pagination from "../../shared/paginate";
export default () => {
  const [inputValues, setValues] = useState({
    clients: [],
  });

  const requestHandler = mainHandler();
  const [globalValues, setGlobalValues] = useGlobal();
  const history = useHistory();

  const fetchClients = async (page) =>{
    if(!page) page=1;
    let res = await requestHandler(Methods.PAGE, clientUrl, null,page);
    if (res) setValues({ ...inputValues, clients: res.data.response });
    setGlobalValues({
      ...globalValues,
      totalPages: res.data.totalPages,
      currentPage: page,
    });
  }

  useEffect(() => {
    
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
        <React.Fragment>
          <Table
            clients={inputValues.clients}
            editClient={(id) => {
              editClient(id);
            }}
            deleteClient={(id) => {
              deleteClient(id);
            }}
          />
          <Pagination fetchData={fetchClients}/>
        </React.Fragment>
      ) : (
        <Alert variant="warning">No clients registered, Add one !!!</Alert>
      )}
    </React.Fragment>
  );
};
