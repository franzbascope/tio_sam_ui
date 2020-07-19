import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import NewBuy from "../pages/buys/new/index";
import Buys from "../pages/buys";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/:id`}>
        <NewBuy />
      </Route>
      <Route path={`${url}/new`}>
        <NewBuy />
      </Route>
      <Route path={`/`}>
        <Buys />
      </Route>
    </Switch>
  );
};
