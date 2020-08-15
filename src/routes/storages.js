import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Storages from "../pages/storages";

export default () => {

  return (
    <Switch>
      <Route path={`/`}>
        <Storages />
      </Route>
    </Switch>
  );
};
