import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import New from "../pages/importations/new/index";
import Index from "../pages/importations";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/:id`}>
        <New />
      </Route>
      <Route path={`${url}/new`}>
        <New />
      </Route>
      <Route path={`/`}>
        <Index />
      </Route>
    </Switch>
  );
};
