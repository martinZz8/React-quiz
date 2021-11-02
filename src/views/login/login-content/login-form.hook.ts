import React, {useState} from "react";

// redux
import {useActions} from "../../../hooks/useActions";

// data
import {initialLoginInputs} from "./login-form.data";

// interfaces
import {ILoginInputs} from "./login-form.types";

const useLoginForm = () => {
  const [loginInputs, setLoginInputs] = useState<ILoginInputs>(initialLoginInputs);
  const {loginUser} = useActions();

  const handleInputsChange = (name: string, value: string) => {
    setLoginInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // other logic
    loginUser("a", "a");
  };

  return {loginInputs, handleInputsChange, submitLogin};
};

export default useLoginForm;