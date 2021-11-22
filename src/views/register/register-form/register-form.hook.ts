import React, {useEffect, useState} from "react";

// interfaces
import {IRegisterInputs, IErrorRegisterInputs} from "./register-form.types";

// data
import {initialRegisterInputs, initialErrorRegisterInputs} from "./register-form.data";

// functions
import {doesStringContainOneOrMoreUpperCaseLetter, doesStringContainOneOrMoreNumber} from "../../../functions/string-contain-checking";

const useRegisterForm = () => {
  const [registerInputs, setRegisterInputs] = useState<IRegisterInputs>(initialRegisterInputs);
  const [errorRegisterInputs, setErrorRegisterInputs] = useState<IErrorRegisterInputs>(initialErrorRegisterInputs);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const [errorMessageRegister, setErrorMessageRegister] = useState<string>("");
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState<boolean>(false);
  const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // useEffect(() => {
  //   console.log("Inputs change:", registerInputs);
  // },[registerInputs]);

  useEffect(() => {
    if (isSuccessRegister) {
      setIsSuccessRegister(false);
      setErrorMessageRegister("");
    }
  },[registerInputs]);

  // Live validating - firstName
  useEffect(() => {
    if (isLiveValidation) {
      validateFirstName();
    }
  },[registerInputs.firstName]);

  // Live validating - lastName
  useEffect(() => {
    if (isLiveValidation) {
      validateLastName();
    }
  },[registerInputs.lastName]);

  // Live validating - email
  useEffect(() => {
    if (isLiveValidation) {
      validateEmail();
    }
  },[registerInputs.email]);

  // Live validating - userName
  useEffect(() => {
    if (isLiveValidation) {
      validateUserName();
    }
  },[registerInputs.userName]);

  // Live validating - password
  useEffect(() => {
    if (isLiveValidation) {
      validatePasswordsIntegrity();
    }
  },[registerInputs.password, registerInputs.passwordRepeat]);

  const handleInputChange = (name: string, value: string) => {
    setRegisterInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFirstName = (): boolean => {
    let message = "";
    if(registerInputs.firstName.length < 3) {
      message = "Imię ma mniej niż 3 znaki";
    }
    else if (registerInputs.firstName.length > 50){
      message = "Imię ma więcej niż 50 znaków";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      firstNameErrorMessage: message
    }));

    return message.length === 0;
  };

  const validateLastName = (): boolean => {
    let message = "";
    if(registerInputs.lastName.length < 3) {
      console.log("lastName:", registerInputs.lastName);
      message = "Nazwisko ma mniej niż 3 znaki";
    }
    else if (registerInputs.lastName.length > 50){
      message = "Nazwisko ma więcej niż 50 znaków";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      lastNameErrorMessage: message
    }));

    return message.length === 0;
  };

  const validateEmail = (): boolean => {
    let message = "";
    if(!emailRgx.test(registerInputs.email)) {
      message = "Format adresu email nie jest poprawny";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      emailErrorMessage: message
    }));

    return message.length === 0;
  };

  const validateUserName = (): boolean => {
    let message = "";
    if(registerInputs.userName.length < 3) {
      message = "Nazwa użytkownika ma mniej niż 3 znaki";
    }
    else if (registerInputs.userName.length > 50) {
      message = "Nazwa użytkownika ma więcej niż 53 znaków";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      userNameErrorMessage: message
    }));

    return message.length === 0;
  };

  const validatePasswordsIntegrity = (): boolean => {
    let messagePassword = "";
    let messagePasswordRepeat = "";
    if (registerInputs.password.localeCompare(registerInputs.passwordRepeat) !== 0) {
      messagePassword = "Hasła muszą się zgadzać";
      messagePasswordRepeat = messagePassword;
    }
    else if (registerInputs.password.length < 6) {
      messagePassword = "Hasło ma mniej niż 6 znaków";
    }
    else if (!doesStringContainOneOrMoreUpperCaseLetter(registerInputs.password)) {
      messagePassword = "Hasło nie zawiera żadnej dużej litery";
    }
    else if (!doesStringContainOneOrMoreNumber(registerInputs.password)) {
      messagePassword = "Hasło nie zawiera żadnej cyfry";
    }

    setErrorRegisterInputs(prev => ({
      ...prev,
      passwordErrorMessage: messagePassword,
      passwordRepeatErrorMessage: messagePasswordRepeat
    }));

    return messagePassword.length === 0 && messagePasswordRepeat.length === 0;
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLiveValidation(true);

    // Validate the inputs
    let canSubmit = true;

    // Validate firstName
    if (!validateFirstName()) {
      canSubmit = false;
    }

    // Validate lastName
    if (!validateLastName()) {
      canSubmit = false;
    }

    // Validate email
    if (!validateEmail()) {
      canSubmit = false;
    }

    // Validate userName
    if (!validateUserName()) {
      canSubmit = false;
    }

    // Validate password integrity
    if (!validatePasswordsIntegrity()) {
      canSubmit = false;
    }

    if (canSubmit) {
      setIsSuccessRegister(false);
      setIsLoadingRegister(true);

      // Fetching register
      fetch(`${process.env.REACT_APP_BACKED_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: registerInputs.firstName,
          lastname: registerInputs.lastName,
          username: registerInputs.userName,
          email: registerInputs.email,
          password: registerInputs.password,
          roles: [
            registerInputs.role
          ]
        })
      })
      .then(async response => {
        setIsLoadingRegister(false);
        if (response.ok) {
          setIsSuccessRegister(true);
        }
        else {
          let resData = await response.json();
          setErrorMessageRegister(resData.message);
        }
      })
      .catch(err => {
        setIsLoadingRegister(false);
        setErrorMessageRegister("Wystąpił nieoczekiwany błąd podczas rejestracji");
      });
    }
  };

  return {registerInputs, errorRegisterInputs, handleInputChange, submitRegister, isLoadingRegister, errorMessageRegister, isSuccessRegister};
};

export default useRegisterForm;