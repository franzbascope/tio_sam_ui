import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import New from "../pages/importations/new/index";
import ImportationDetails from "../pages/importations/detail/index";
import Index from "../pages/importations";

export default () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/detail/:id`}>
        <ImportationDetails />
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
