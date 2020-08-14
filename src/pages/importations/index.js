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
import Pagination from "../../shared/paginate";

export default () => {
  const [inputValues, setValues] = useState({
    importations: [],
  });
  const [globalValues,setGlobalValues] = useGlobal();
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

  const fetchData = async (page, url) =>{
    if (!page) page = 1;
    let res = await requestHandler(Methods.PAGE, url, null, page);
    setGlobalValues({
      ...globalValues,
      totalPages: res.data.totalPages,
      currentPage: page,
    });
    return res;
  }
  const fetchImportations = async(page) => {
    let res = await fetchData(page, importationUrl);
    if (res) setValues({ ...inputValues, importations: res.data.response });
  }
  useEffect(() => {
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
        <React.Fragment>
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
        <Pagination fetchData={fetchImportations} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
