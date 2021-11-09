import React from "react";

// styles
import styles from "./main-menu.module.scss";

const TemplateMainMenu: React.FC = ({children}) => {
  return (
    <div className={styles.mainMenu}>
      {children}
    </div>
  );
};

export default TemplateMainMenu;