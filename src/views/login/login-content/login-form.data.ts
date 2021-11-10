// interfaces
import {ILoginInputs, IErrorLoginInputs} from "./login-form.types";

export const initialLoginInputs: ILoginInputs = {
  username: "",
  password: ""
};

export const initialErrorLoginInputs: IErrorLoginInputs = {
  usernameMessage: "",
  passwordMessage: ""
};