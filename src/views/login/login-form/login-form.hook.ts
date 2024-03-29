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
  const {loginUser, setLoginErrorMessage, setLoading} = useActions();
  const {loading: loadingLogin, error: errorLogin} = useTypedSelector(state => state.login);

  useEffect(() => {
    setLoginErrorMessage(null);
    setLoading(false);
  },[]);

  // Live validating - userName
  useEffect(() => {
    if (isLiveValidation) {
      validateUserName();
    }
  },[loginInputs.userName]);

  // Live validating - password
  useEffect(() => {
    if (isLiveValidation) {
      validatePassword();
    }
  },[loginInputs.password]);

  const validateUserName = (): boolean => {
    let message = "";
    if (loginInputs.userName.length === 0) {
      message = "Nazwa użytkownika nie może być pusta";
    }

    setErrorLoginInputs(prev => ({
      ...prev,
      userNameMessage: message
    }));

    return message.length === 0;
  };

  const validatePassword = (): boolean => {
    let message = "";
    if (loginInputs.password.length === 0) {
      message = "Hasło nie może być puste";
    }

    setErrorLoginInputs(prev => ({
      ...prev,
      passwordMessage: message
    }));

    return message.length === 0;
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
    if (!validateUserName()) {
      canSubmit = false;
    }

    // Validate password
    if (!validatePassword()) {
      canSubmit = false;
    }

    // Checking if we can submit the login
    if (canSubmit) {
      loginUser(loginInputs.userName, loginInputs.password);
    }
  };

  return {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin};
};

export default useLoginForm;