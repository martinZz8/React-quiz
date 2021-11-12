import React, {ChangeEvent} from "react";

// styles
import styles from "./text-area.module.scss";

// interfaces
interface ITextArea {
  name: string;
  value: string;
  label?: string;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
  handleChange: (name: string, value: string) => void
}

const TextArea: React.FC<ITextArea> = ({
    name, value, label, placeholder, isError, errorMessage, handleChange
  }) => {

  return (
    <div className={styles.textAreaWrap}>
      {
        label ?
          <div className={styles.label}>
            <p>{label}</p>
          </div>
        :
          null
      }
      <textarea
        className={`${styles.textArea} ${isError ? styles.errorTextArea : ""}`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e:ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.name, e.target.value)}
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

export default TextArea;