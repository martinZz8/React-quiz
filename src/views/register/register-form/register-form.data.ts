// interfaces
import {IUserRoles, IRegisterInputs, IErrorRegisterInputs} from "./register-form.types";

export const userRoles: IUserRoles = {
  student: "ROLE_USER",
  teacher: "ROLE_TEACHER"
};

export const initialRegisterInputs: IRegisterInputs = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  passwordRepeat: "",
  role: userRoles.student
};

export const initialErrorRegisterInputs: IErrorRegisterInputs = {
  firstNameErrorMessage: "",
  lastNameErrorMessage: "",
  userNameErrorMessage: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
  passwordRepeatErrorMessage: ""
};