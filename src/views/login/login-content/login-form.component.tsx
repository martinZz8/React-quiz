import React from "react";

// styles
import styles from "./login-form.module.scss";

// hooks
import useLoginForm from "./login-form.hook";

// interfaces
interface ILoginForm {

}

const LoginForm:React.FC<ILoginForm> = () => {
  const {loginInputs, handleInputsChange, submitLogin} = useLoginForm();

  // TO DO - do login form
  return (
    <form
      className={styles.loginForm}
      onSubmit={(e: React.FormEvent) => submitLogin(e)}
    >
      <span>Here!</span>
      <button type="submit">
        Click
      </button>
    </form>
  );
};

export default LoginForm;