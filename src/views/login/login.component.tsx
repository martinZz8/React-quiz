import React from "react";

// styles
import styles from "./login.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";

// components
import LoginForm from "./login-content/login-form.component";

// interfaces
interface IViewLogin {
  appVersion: string;
}

const ViewLogin:React.FC<IViewLogin> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Logowanie">
      <div className={styles.login}>
        <LoginForm/>
      </div>
    </TemplateView>
  );
};

export default ViewLogin;