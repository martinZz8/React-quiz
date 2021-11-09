import React from "react";

// styles
import styles from "./login.module.scss";

const TemplateLogin: React.FC = ({children}) => {

  return (
    <div className={styles.login}>
      {children}
    </div>
  );
};

export default TemplateLogin;