import React, {ChangeEvent} from "react";

// styles
import styles from "./input-field.module.scss";

// interfaces
interface IInputField {
  type: "text" | "password" | "email" | "number";
  name: string;
  value: string;
  label: string;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
  handleChange: (name: string, value: string) => void;
}

const InputField: React.FC<IInputField> = ({
    type, name, value, label, placeholder, isError, errorMessage, handleChange
  }) => {

  return (
    <div className={styles.inputField}>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
      <input
        className={`${styles.input} ${isError ? styles.errorInput : null}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value)}
      />
      <div className={styles.errorMessage}>
        {
          isError && errorMessage !== "" ?
            <p>{errorMessage}</p>
          :
            null
        }
      </div>
    </div>
  );
};

export default InputField;