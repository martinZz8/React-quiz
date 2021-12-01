import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// hooks
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import isUserType from "../../../functions/is-user-type";

// views
import ViewError from "../../error/error.component";
import ViewStudentMainMenu from "../../main-menu/student/student-main-menu.component";
import ViewTeacherMainMenu from "../../main-menu/teacher/teacher-main-menu.component";
import ViewSolveATest from "../../solve-a-test/solve-a-test.component";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {
  const userRoles = useTypedSelector(state => state.login.loginData.user.roles);

  return (
    <Switch>
      {/*other routes*/}
      {/*<Route*/}
      {/*  exact*/}
      {/*  path="/testy/wyniki/:id"*/}
      {/*  component={() => (*/}
      {/*    isUserType("student", userRoles) ?*/}
      {/*      <ViewSolveATest appVersion={appVersion} />*/}
      {/*      ://ROLE_TEACHER*/}
      {/*      <Redirect to="/" />*/}
      {/*  )*/}
      {/*  }*/}
      {/*/>*/}
      <Route
        exact
        path="/testy/rozwiaz/:id"
        component={() => (
          isUserType("student", userRoles) ?
            <ViewSolveATest appVersion={appVersion} />
          ://ROLE_TEACHER
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/"
        component={() => (
            isUserType("student", userRoles) ?
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