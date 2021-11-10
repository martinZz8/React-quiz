import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {AdminLogin} from "../data-types/login";

export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {

    dispatch({
      type: ActionType.USER_LOGIN_REQUEST
    });

    try {
      // TO DO - change the login url
      const {data} = await axios.post(`${process.env.REACT_APP_BACKED_URL}/api/auth/signin`, {
          username: username,
          password: password
        },{
        headers: {
            'Content-Type': 'application/json'
        }
      });

      // const data: AdminLogin = { // TO REMOVE - uncomment higher code
      //   accessToken: "abc",
      //   user: {
      //     role: "teacher",
      //     email: "160746@stud.prz.edu.pl",
      //     firstName: "Maciej",
      //     lastName: "Harbuz"
      //   }
      // };

      console.log("data", data);
      const loginResults: AdminLogin = {
        accessToken: data.token ? data.token : "",
        refreshToken: data.refreshToken ? data.refreshToken : "",
        user: {
          id: data.id ? data.id : "",
          username: data.username ? data.username : "",
          firstName: data.firstname ? data.firstname : "",
          lastName: data.lastname ? data.lastname : "",
          email: data.email ? data.email : "",
          roles: data.roles
        }
      };

      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: loginResults
      });
    } catch (err) {
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "Niepoprawne dane logowania"
      });

      console.log("Error:", err);
    }
  }
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGOUT
    });
  }
};

export const setLoginErrorMessage = (state: string | null) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_ERROR,
      payload: state
    });
  }
};

export const setLoading = (state: boolean) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    dispatch({
      type: ActionType.USER_LOGIN_SET_LOADING,
      payload: state
    });
  }
};