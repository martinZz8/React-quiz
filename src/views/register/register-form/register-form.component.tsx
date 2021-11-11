import React from "react";
import {Link} from "react-router-dom";

// styles
import styles from "./register-form.module.scss";

// hooks
import useRegisterForm from "./register-form.hook";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import Button from "../../../components/ui/button/button.component";
import RoleSelector from "./role-selector/role-selector.component";
import MessageBox from "../../../components/message-box/message-box.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";

const RegisterForm: React.FC = () => {
  const {registerInputs, errorRegisterInputs, submitRegister, handleInputChange, isLoadingRegister, errorMessageRegister, isSuccessRegister} = useRegisterForm();

  return (
    <form
      className={styles.registerForm}
      onSubmit={(e: React.FormEvent) => submitRegister(e)}
      noValidate
    >
      <p className={styles.headerText}>
        Rejestracja
      </p>
      <div className={styles.inputForm}>
        <div className={styles.input}>
          <InputField
            type="text"
            name="firstName"
            label="Imię"
            placeholder="Imię"
            value={registerInputs.firstName}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.firstNameErrorMessage !== ""}
            errorMessage={errorRegisterInputs.firstNameErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="text"
            name="lastName"
            label="Nazwisko"
            placeholder="Nazwisko"
            value={registerInputs.lastName}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.lastNameErrorMessage !== ""}
            errorMessage={errorRegisterInputs.lastNameErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="text"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            value={registerInputs.email}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.emailErrorMessage !== ""}
            errorMessage={errorRegisterInputs.emailErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="text"
            name="userName"
            label="Nazwa użytkownika"
            placeholder="Nazwa użytkownika"
            value={registerInputs.userName}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.userNameErrorMessage !== ""}
            errorMessage={errorRegisterInputs.userNameErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="password"
            name="password"
            label="Hasło"
            placeholder="Hasło"
            value={registerInputs.password}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.passwordErrorMessage !== ""}
            errorMessage={errorRegisterInputs.passwordErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <InputField
            type="password"
            name="passwordRepeat"
            label="Powtórz hasło"
            placeholder="Powtórz hasło"
            value={registerInputs.passwordRepeat}
            handleChange={handleInputChange}
            isError={errorRegisterInputs.passwordRepeatErrorMessage !== ""}
            errorMessage={errorRegisterInputs.passwordRepeatErrorMessage}
          />
        </div>
        <p className={styles.selectorLabel}>
          Rodzaj konta
        </p>
        <div className={styles.roleSelector}>
          <RoleSelector
            selectedRole={registerInputs.role}
            setRole={(value: string) => handleInputChange("role", value)}
          />
        </div>
        <div className={styles.submitButtonForm}>
          <div className={styles.buttonWrap}>
            <Button
              type="submit"
              backgroundColor="purple"
              fontColor="white"
              title="Zarejestruj się"
            />
          </div>
        </div>
        {
          isSuccessRegister ?
            <div className={styles.registerErrorWrap}>
              <MessageBox
                message="Pomyślnie zarejestrowano konto"
                link={<Link to="/">Zaloguj się</Link>}
                wide
              />
            </div>
          : errorMessageRegister !== "" ?
            <div className={styles.registerErrorWrap}>
              <MessageBox
                message={errorMessageRegister}
                wide
                isError
              />
            </div>
          :
            null
        }
        <div className={styles.privatePolicy}>
          <p>
            Rejestrujc się w serwisie akceptujesz <Link to="#">Regulamin</Link>
            <br/>
            oraz <Link to="#">Politykę Prywatności</Link>.
          </p>
        </div>
      </div>
      {
        isLoadingRegister ?
          <LoadingModal/>
        :
          null
      }
    </form>
  );
};

export default RegisterForm;