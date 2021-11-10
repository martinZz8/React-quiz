import React, {useEffect, useState} from "react";

// redux
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// data
import {initialLoginInputs, initialErrorLoginInputs} from "./login-form.data";

// interfaces
import {IErrorLoginInputs, ILoginInputs} from "./login-form.types";

const useLoginForm = () => {
  const [loginInputs, setLoginInputs] = useState<ILoginInputs>(initialLoginInputs);
  const [errorLoginInputs, setErrorLoginInputs] = useState<IErrorLoginInputs>(initialErrorLoginInputs);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const {loginUser, setLoginErrorMessage} = useActions();
  const {loading: loadingLogin, error: errorLogin} = useTypedSelector(state => state.login);

  useEffect(() => {
    setLoginErrorMessage("");
  },[]);

  // Live validating - username
  useEffect(() => {
    if (isLiveValidation) {
      validateUsername();
    }
  },[loginInputs.username]);

  // Live validating - password
  useEffect(() => {
    if (isLiveValidation) {
      validatePassword();
    }
  },[loginInputs.password]);

  const validateUsername = (): boolean => {
    if (loginInputs.username.length === 0) {
      setErrorLoginInputs(prev => ({
        ...prev,
        usernameMessage: "Nazwa użytkownika nie może być pusta"
      }));
      return false;
    }
    else {
      setErrorLoginInputs(prev => ({
        ...prev,
        usernameMessage: ""
      }));
      return true;
    }
  };

  const validatePassword = (): boolean => {
    if (loginInputs.password.length === 0) {
      setErrorLoginInputs(prev => ({
        ...prev,
        passwordMessage: "Hasło nie może być puste"
      }));
      return false;
    }
    else {
      setErrorLoginInputs(prev => ({
        ...prev,
        passwordMessage: ""
      }));
      return true;
    }
  };

  const handleInputsChange = (name: string, value: string) => {
    setLoginInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLiveValidation(true);
    // Validate the inputs
    let canSubmit = true;

    // Validate email
    if (!validateUsername()) {
      canSubmit = false;
    }

    // Validate password
    if (!validatePassword()) {
      canSubmit = false;
    }

    // Checking if we can submit the login
    if (canSubmit) {
      loginUser(loginInputs.username, loginInputs.password);
    }
  };

  return {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin};
};

export default useLoginForm;