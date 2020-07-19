import React from "react";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Loader from "../../shared/loader";

export default () => {
  const [globalValues] = useGlobal();
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/buys/new">
        New Buy
      </Link>
      <Messages />
      {globalValues.loading ? <Loader /> : <h1>Hola Mundo</h1>}
    </React.Fragment>
  );
};
