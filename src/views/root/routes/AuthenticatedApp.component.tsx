import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// hooks
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// views
import ViewError from "../../error/error.component";
import ViewStudentMainMenu from "../../main-menu/student/student-main-menu.component";
import ViewTeacherMainMenu from "../../main-menu/teacher/teacher-main-menu.component";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {
  const userRoles = useTypedSelector(state => state.login.loginData.user.roles);

  return (
    <Switch>
      {/*other routes*/}
      <Route
        exact
        path="/"
        component={() => (
            userRoles.includes("ROLE_USER") ?
              <ViewStudentMainMenu appVersion={appVersion} />
            ://ROLE_TEACHER
              <ViewTeacherMainMenu appVersion={appVersion} />
          )
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