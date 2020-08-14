import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import New from "../pages/sells/new";
import Details from "../pages/sells/details/index";
import Index from "../pages/sells";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/detail/:id`}>
        <Details />
      </Route>
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
