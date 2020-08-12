import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Loader from "../../shared/loader";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import { importationUrl } from "../../shared/urls";
import * as Methods from "../../shared/methods";
import { useHistory } from "react-router-dom";

export default () => {
  const [inputValues, setValues] = useState({
    importations: [],
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const deleteImportation = async (id) => {
    if (window.confirm("Are you sure you want to delete this importation?")) {
      await requestHandler(
        Methods.DELETE,
        importationUrl,
        null,
        id,
        "Importation deleted successfully"
      );
      setValues({
        ...inputValues,
        importations: filterImportation(id, inputValues.importations),
      });
    }
  };

  const filterImportation = (id, importations) => {
    return importations.filter((importation) => {
      return importation._id != id;
    });
  };

  const edit = (id) => {
    history.push(`/importations/${id}`);
  };
  
  const details = (id) => {
    history.push(`/importations/detail/${id}`);
  };

  useEffect(() => {
    async function fetchImportations() {
      let res = await requestHandler(Methods.GET, importationUrl);
      if (res) setValues({ ...inputValues, importations: res.data });
    }
    fetchImportations();
  }, []);
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/importations/new">
        New Importation
      </Link>
      <Messages />
      {globalValues.loading ? (
        <Loader />
      ) : (
        <Table
          importations={inputValues.importations}
          deleteImportation={(id) => {
            deleteImportation(id);
          }}
          edit={(id) => {
            edit(id);
          }}
          importationDetails={(id)=>{
            details(id);
          }}
        />
      )}
    </React.Fragment>
  );
};
