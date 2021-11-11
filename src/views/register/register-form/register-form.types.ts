export interface IUserRoles {
  student: string;
  teacher: string;
}

export interface IRegisterInputs {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
}

export interface IErrorRegisterInputs {
  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  userNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  passwordRepeatErrorMessage: string;
}