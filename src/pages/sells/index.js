import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import * as Methods from "../../shared/methods";
import { sellUrl } from "../../shared/urls";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default () => {
  const [inputValues, setValues] = useState({
    sells: [],
  });

  const requestHandler = mainHandler();
  const [globalValues] = useGlobal();
  const history = useHistory();

  useEffect(() => {
    async function fetchSells() {
      let res = await requestHandler(Methods.GET, sellUrl);
      if (res) setValues({ ...inputValues, sells: res.data });
    }
    fetchSells();
  }, []);

  const deletes = async (id) => {
    if (window.confirm("Are you sure you want to delete this sell?")) {
      await requestHandler(
        Methods.DELETE,
        sellUrl,
        null,
        id,
        "Sell deleted successfully"
      );
      let sells = inputValues.sells.filter((sell) => {
        return sell._id != id;
      });
      setValues({
        ...inputValues,
        sells,
      });
    }
  };

  const edit = (id) => {
    history.push(`/sells/${id}`);
  };

  const detail = (id) => {
    history.push(`/sells/detail/${id}`);
  };

  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/sells/new">
        New Sell
      </Link>
      <Messages />
      <Table
        loading={globalValues.loading}
        sells={inputValues.sells}
        detail={(id) => {
          //detail(id);
        }}
        edit={(id) => {
          edit(id);
        }}
        deletes={(id) => {
          deletes(id);
        }}
      />
    </React.Fragment>
  );
};
