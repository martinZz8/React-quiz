import React from "react";

// styles
import styles from "./content-center.module.scss";

const TemplateContentCenter: React.FC = ({children}) => {
  return (
    <div className={styles.contentCenter}>
      {children}
    </div>
  );
};

export default TemplateContentCenter;