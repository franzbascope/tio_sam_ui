import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import New from "../pages/sells/new";
import Index from "../pages/sells";

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
