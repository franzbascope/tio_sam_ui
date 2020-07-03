import React, { setGlobal } from "reactn";
import { GlobalState } from "./defaultState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppLayout from "./layout/index";
import Products from "./pages/products";
import Sells from "./pages/sells";

export default function App() {
  setGlobal(GlobalState);
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/sells">
            <Sells />
          </Route>
          <Route path="/">
            <h1>Welcome to Tio Sam Importaciones</h1>
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}
