import React from "react";

// styles
import styles from "./top-menu.module.scss";

const TemplateTopMenu: React.FC = ({children}) => {

  return (
    <div className={styles.topMenu}>
      {children}
    </div>
  );
};

export default TemplateTopMenu;