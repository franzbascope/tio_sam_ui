import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import AppLayout from "../layout/index";
import Sells from "../pages/sells";
import BuysRoute from "./buys";
import ImportationsRoute from "./importations";
import ProductsRoute from "./products";
import ClientsRoute from "./clients";
import NoMatch from "../pages/notFound";

export default () => {
  let { url } = useRouteMatch();

  return (
    <AppLayout>
      <Switch>
        <Route path="/sells">
          <Sells />
        </Route>
        <Route path="/clients">
          <ClientsRoute />
        </Route>
        <Route path="/products">
          <ProductsRoute />
        </Route>
        <Route path="/buys">
          <BuysRoute />
        </Route>
        <Route path="/importations">
          <ImportationsRoute />
        </Route>
        <Route path="/" exact={true}>
          <h1>Welcome to Tio Sam Importaciones</h1>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </AppLayout>
  );
};
