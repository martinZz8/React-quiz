import React from "react";

// styles
import styles from "./main-menu-header.module.scss";

// interfaces
interface IMainMenuHeader {
  firstTitle: string;
  secondTitle: string;
  onFirstTitleClick: () => void;
  onSecondTitleClick: () => void;
  isFirstHeaderActive: boolean;
}

const MainMenuHeader: React.FC<IMainMenuHeader> = ({firstTitle, secondTitle, onFirstTitleClick, onSecondTitleClick, isFirstHeaderActive}) => {

  return (
    <div className={styles.mainMenuHeader}>
      <div
        className={`${styles.firstHeader} ${isFirstHeaderActive ? styles.active : ""}`}
        onClick={onFirstTitleClick}
      >
        <p className="noSelect">
          {firstTitle}
          <span className={styles.underline}/>
        </p>
      </div>
      <div className={styles.divider}/>
      <div
        className={`${styles.secondHeader} ${!isFirstHeaderActive ? styles.active : ""}`}
        onClick={onSecondTitleClick}
      >
        <p className="noSelect">
          {secondTitle}
          <span className={styles.underline}/>
        </p>
      </div>
    </div>
  );
};

export default MainMenuHeader;