import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppLayout from "./layout/index";
import Products from "./pages/products";
import Sells from "./pages/sells";

export default function App() {
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
