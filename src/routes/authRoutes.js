import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import AppLayout from "../layout/index";
import Sells from "../pages/sells";
import ProductsRoute from "./products";
import NoMatch from "../pages/notFound";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <AppLayout>
        <Route path="/sells">
          <Sells />
        </Route>
        <Route path="/products">
          <ProductsRoute />
        </Route>
        <Route path="/" exact={true}>
          <h1>Welcome to Tio Sam Importaciones</h1>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </AppLayout>
    </Switch>
  );
};
