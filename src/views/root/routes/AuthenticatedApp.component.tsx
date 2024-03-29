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
import ViewShowTests from "../../show-tests/show-tests.component";
import ViewShowCompletedTests from "../../show-completed-tests/show-completed-tests.component";
import ViewRateTest from "../../rate-test/rate-test.component";
import ViewShowStudentTestResult from "../../show-test-results/student/show-student-test-result.component";
import ViewShowTeacherTestResult from "../../show-test-results/teacher/show-teacher-test-result.component";

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
      <Route
        exact
        path="/testy/wyniki/nauczyciel/:id"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewShowTeacherTestResult appVersion={appVersion} />
          ://TEACHER
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/testy/wyniki/student/:id"
        component={() => (
          isUserType("student", userRoles) ?
            <ViewShowStudentTestResult appVersion={appVersion} />
          ://TEACHER
            <Redirect to="/" />
        )
        }
      />
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
        path="/testy/ocen/:id"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewRateTest appVersion={appVersion} />
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      <Route
        exact
        path="/testy/zakonczone"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewShowCompletedTests appVersion={appVersion} />
          ://STUDENT
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
        path="/testy"
        component={() => (
          isUserType("teacher", userRoles) ?
            <ViewShowTests appVersion={appVersion}/>
          ://STUDENT
            <Redirect to="/" />
        )
        }
      />
      {/*Main menu*/}
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
      {/*Other routes*/}
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