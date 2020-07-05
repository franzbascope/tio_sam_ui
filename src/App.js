import React, { setGlobal } from "reactn";
import { GlobalState } from "./defaultState";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppLayout from "./layout/index";
import Sells from "./pages/sells";
import Login from "./pages/auth/login";
import NoMatch from "./pages/notFound";
import AuthRoutes from "./routes/authRoutes";

export default function App() {
  setGlobal(GlobalState);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <AuthRoutes />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const isUserAuthenticated = () => {
  return sessionStorage.getItem("tioSamUser");
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
