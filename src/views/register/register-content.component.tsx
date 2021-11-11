import React from "react";

// styles
import styles from "./register-content.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateLogin from "../../templates/login/login.template";

// components
import RegisterForm from "./register-form/register-form.component";

// interfaces
interface IViewRegister {
  appVersion: string;
}

const ViewRegister:React.FC<IViewRegister> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Rejestracja" hasNoMenu>
      <TemplateLogin>
        <RegisterForm/>
      </TemplateLogin>
    </TemplateView>
  );
};

export default ViewRegister;