import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// views
import ViewError from "../../error/error.component";
import ViewMainMenu from "../../main-menu/main-menu.component";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {

  return (
    <Switch>
      <Route
        exact
        path="/menu" //Here should be path="/" and the should not be redirect, that is below
        component={() =>
          <ViewMainMenu appVersion={appVersion} />
        }
      />
      <Route
        exact
        path="/"
        component={() =>
          <Redirect to="/menu" />
        }
      />
      <Route
        exact
        path="*"
        component={() =>
          <ViewError appVersion={appVersion} />
        }
      />
    </Switch>
  );
};

export default AuthenticatedApp;