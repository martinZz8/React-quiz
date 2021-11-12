import React, {ChangeEvent} from "react";

// styles
import styles from "./checkbox.module.scss";

// interfaces
interface ICheckbox {
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  handleChange: (name: string, value: string) => void;
}

const Checkbox: React.FC<ICheckbox> = ({
    name, value, checked, label, handleChange
  }) => {

  return (
    <label className={`noSelect ${styles.container}`}>
      {label}
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name, e.target.checked ? e.target.value : "")}
      />
      <span className={styles.checkmark}/>
    </label>
  );
};

export default Checkbox;