import axios from "axios";
import {Dispatch} from "redux";

// types
import {ActionType} from "../action-types/login";
import {LoginActions} from "../actions/login";
import {AdminLogin} from "../data-types/login";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<LoginActions>) => {

    dispatch({
      type: ActionType.USER_LOGIN_REQUEST
    });

    try {
      // TO DO - change the login url
      // const {data} = await axios.post(`${process.env.REACT_APP_BACKED_URL}/login`, {
      //   email: email,
      //   password: password
      // },{
      //   headers: {
      //       'Content-Type': 'application/json'
      //   }
      // });

      const data: AdminLogin = { // TO REMOVE - uncomment higher code
        accessToken: "abc",
        user: {
          role: "teacher",
          email: "abc",
          firstName: "Andrzej",
          lastName: "Nowak"
        }
      };

      //console.log("data", data);
      // const loginResults: AdminLogin = {
      //   accessToken: data.accessToken ? data.accessToken : "",
      //   user: {
      //     role: data?.user?.role ? data.user.role : "",
      //     firstName: data?.user?.firstName ? data.user.firstName : "",
      //     lastName: data?.user?.lastName ? data.user.lastName : "",
      //     email: data?.user?.email ? data.user.email : ""
      //   }
      // };

      const loginResults: AdminLogin = data; // TO REMOVE - uncomment higher code

      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: loginResults
      });
    } catch (err) {
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: "error during login"
      });
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