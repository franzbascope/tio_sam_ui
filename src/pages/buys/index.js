import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Loader from "../../shared/loader";
import Table from './table';
import mainHandler from "../../shared/requestHandler";
import { buysUrl } from "../../shared/urls";
import * as Methods from "../../shared/methods";


export default () => {

  const [inputValues, setValues] = useState({
    buys: [],
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();

  useEffect(() => {
    async function fetchProducts() {
      let res = await requestHandler(Methods.GET, buysUrl);
      if (res) setValues({ ...inputValues, buys: res.data });
    }
    fetchProducts();
  }, []);
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/buys/new">
        New Buy
      </Link>
      <Messages />
      {globalValues.loading ? <Loader /> : <Table buys={inputValues.buys} />}
    </React.Fragment>
  );
};
