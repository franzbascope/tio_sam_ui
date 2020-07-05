import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import NewProduct from "../pages/products/new";
import Products from "../pages/products";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/:id`}>
        <NewProduct />
      </Route>
      <Route path={`${url}/new`}>
        <NewProduct />
      </Route>
      <Route path={`/`}>
        <Products />
      </Route>
    </Switch>
  );
};
