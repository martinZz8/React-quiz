import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
import ViewLogin from "../../login/login-content.component";
import ViewRegister from "../../register/register-content.component";

// interfaces
interface IUnauthenticatedApp {
  appVersion: string;
}

const UnauthenticatedApp: React.FC<IUnauthenticatedApp> = ({appVersion}) => {

  return (
    <Switch>
      <Route
        exact
        path="/register"
        component={() =>
          <ViewRegister appVersion={appVersion} />
        }
      />
      <Route
        exact
        path="/"
        component={() =>
          <ViewLogin appVersion={appVersion} />
        }
      />
      <Route
        path="*"
        component={() =>
          <Redirect to="/" />
        }
      />
    </Switch>
  );
};

export default UnauthenticatedApp;