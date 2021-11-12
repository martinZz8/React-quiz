import React, {ChangeEvent} from "react";

// styles
import styles from "./radio-button.module.scss";

// interfaces
interface IRadioButton {
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  handleChange: (name: string, value: string) => void;
}

const RadioButton: React.FC<IRadioButton> = ({
  name, value, checked, label, handleChange
 }) => {

  return (
    <label className={styles.radioButton}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.value)}
      />
      <p>{label}</p>
    </label>
  );
};

export default RadioButton;

