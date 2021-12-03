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
import ViewAddNewQuestion from "../../add-new-question/add-new-question.component";
import ViewShowQuestions from "../../show-questions/show-questions.component";
import ViewAddNewTest from "../../add-new-test/add-new-test.component";

// interfaces
interface IAuthenticatedApp {
  appVersion: string;
}

const AuthenticatedApp: React.FC<IAuthenticatedApp> = ({appVersion}) => {
  const userRoles = useTypedSelector(state => state.login.loginData.user.roles);

  return (
    <Switch>
      {/*Questions*/}
      <Route
        exact
        path="/pytania/edytuj/:id"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewAddNewQuestion appVersion={appVersion} isQuestionEdit/>
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/pytania/dodaj"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewAddNewQuestion appVersion={appVersion} />
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/pytania"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewShowQuestions appVersion={appVersion} />
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      {/*Tests*/}
      {/*other routes*/}
      {/*<Route*/}
      {/*  exact*/}
      {/*  path="/testy/wyniki/:id"*/}
      {/*  component={() => (*/}
      {/*    isUserType("student", userRoles) ?*/}
      {/*      <ViewTestResult appVersion={appVersion} />*/}
      {/*    ://TEACHER*/}
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
          ://TEACHER
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/testy/edytuj/:id"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewAddNewTest appVersion={appVersion} isTestEdit/>
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/testy/dodaj"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewAddNewTest appVersion={appVersion} />
          ://STUDENT
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
          ://TEACHER
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