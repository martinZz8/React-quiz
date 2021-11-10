import React from "react";
import {Link} from "react-router-dom";

// styles
import styles from "./login-form.module.scss";

// SVGS
import {ReactComponent as SVGLoginImage} from "../../../assets/svg/login_image.svg";

// components
import InputField from "../../../components/ui/input-field/input-field.component";

// hooks
import useLoginForm from "./login-form.hook";
import Button from "../../../components/ui/button/button.component";

// interfaces
interface ILoginForm {

}

const LoginForm:React.FC<ILoginForm> = () => {
  const {loginInputs, errorLoginInputs, handleInputsChange, submitLogin, loadingLogin, errorLogin} = useLoginForm();

  // TO DO - do login form
  return (
    <form
      className={styles.loginForm}
      onSubmit={(e: React.FormEvent) => submitLogin(e)}
      noValidate
    >
      <div className={styles.leftSite}>
        <div className={styles.loginImage}>
          <SVGLoginImage/>
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionText}>
            Twórz i rozwiązuj testy
            <br/>
            w jeszcze <b>łatwiejszy</b>
            <br/>
            sposób niż <b>kiedykolwiek!</b>
          </p>
        </div>
      </div>
      <div className={styles.rightSite}>
        <div className={styles.header}>
          <p className={styles.headerText}>Zaloguj się</p>
          <p className={styles.subHeaderText}>Twórz, rozwiązuj testy i zobacz jakie to łatwe!</p>
        </div>
        <div className={styles.inputForm}>
          <div className={styles.input}>
            <InputField
              type="text"
              label="Nazwa użytkownika"
              placeholder="Nazwa użytkownika"
              name="username"
              value={loginInputs.username}
              handleChange={handleInputsChange}
              isError={errorLoginInputs.usernameMessage !== ""}
              errorMessage={errorLoginInputs.usernameMessage}
            />
          </div>
          <div className={styles.input}>
            <InputField
              type="password"
              label="Hasło"
              placeholder="Hasło"
              name="password"
              value={loginInputs.password}
              handleChange={handleInputsChange}
              isError={errorLoginInputs.passwordMessage !== ""}
              errorMessage={errorLoginInputs.passwordMessage}
            />
          </div>
        </div>
        <div className={styles.submitButtonForm}>
          <div className={styles.buttonWrap}>
            <Button
              type="submit"
              backgroundColor="purple"
              fontColor="white"
              title="Zaloguj się"
            />
          </div>
        </div>
        <div className={styles.loginErrorWrap}>
          {
            errorLogin ?
              <div className={styles.errorBox}>
                <p>{errorLogin}</p>
              </div>
            :
              null
          }
        </div>
        <div className={styles.additionalInfo}>
          <p>
            Nie masz jeszcze konta?
            <Link to="/register">
              Zarejestruj się!
            </Link>
          </p>
        </div>
        {
          loadingLogin ?
            <div className={styles.loaderBox}>
              <div className="loader"/>
            </div>
          :
            null
        }
      </div>
    </form>
  );
};

export default LoginForm;