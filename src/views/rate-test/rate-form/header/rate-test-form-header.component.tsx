import React from "react";

// styles
import styles from "./rate-test-form-header.module.scss";

// interfaces
import {IStudent} from "../rate-test-form.types";

interface IRateTestFormHeader {
  actualStudent: IStudent | undefined;
}

const RateTestFormHeader: React.FC<IRateTestFormHeader> = ({actualStudent}) => {

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <p>Test zaliczeniowy</p>
      </div>
      <div className={styles.author}>
        <p>Autor: {actualStudent?.firstName} {actualStudent?.lastName}</p>
      </div>
    </div>
  );
};

export default RateTestFormHeader;