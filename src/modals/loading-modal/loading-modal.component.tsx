import React from "react";

// styles
import styles from "./loading-modal.module.scss";

const LoadingModal: React.FC = () => {

  return (
    <div className={styles.loadingModal}>
      <div className="loader"/>
    </div>
  );
};

export default LoadingModal;