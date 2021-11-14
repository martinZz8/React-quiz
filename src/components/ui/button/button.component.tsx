import React from "react";

// styles
import styles from "./button.module.scss";

// interfaces
interface IButton {
  type: "submit" | "button";
  title: string;
  backgroundColor: "purple" | "lightPurple" | "black";
  fontColor: "white";
  handleClick?: () => void;
  disabled?: boolean;
  noBorderRadius?: boolean;
}

const Button: React.FC<IButton> = ({
    type, title, backgroundColor, fontColor, handleClick, disabled, noBorderRadius
  }) => {
  const stylesBackgroundColor = backgroundColor === "lightPurple" ? styles.backgroundColorLightPurple : backgroundColor === "purple" ? styles.backgroundColorPurple : styles.backgroundColorBlack;
  const stylesFontColor = fontColor === "white" ? styles.fontColorWhite : styles.fontColorWhite;
  const hoverColors =
    fontColor === "white" ?
      backgroundColor === "lightPurple" ?
        styles.hoverColorsLightPurple
      : backgroundColor === "purple" ?
          styles.hoverColorsPurple
      :
        styles.hoverColorsBlack
    :
      styles.hoverColorsLightPurple;


  return (
    <div className={styles.buttonWrap}>
      <button
        className={`
          ${styles.button}
          ${!disabled ? stylesBackgroundColor : ""}
          ${!disabled ? stylesFontColor : ""}
          ${!disabled ? hoverColors : ""}
          ${disabled ? styles.disabledColors : ""}
          ${noBorderRadius ? styles.noBorderRadius : ""}
        `}
        type={type}
        onClick={() => handleClick && handleClick()}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;