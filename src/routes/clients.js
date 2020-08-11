import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import NewClient from "../pages/clients/new";
import Clients from "../pages/clients";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/:id`}>
        <NewClient />
      </Route>
      <Route path={`${url}/new`}>
        <NewClient />
      </Route>
      <Route path={`/`}>
        <Clients />
      </Route>
    </Switch>
  );
};
