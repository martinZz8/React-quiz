import React from "react";

// styles
import styles from "./rate-test-form-navigation.module.scss";

// components
import Button from "../../../../components/ui/button/button.component";

// interfaces
interface IRateTestFormNavigation {
  isPrevButtonVisible: boolean;
  isNextButtonVisible: boolean;
  handlePrevButtonClick: () => void;
  handleNextButtonClick: () => void;
  handleSubmitClick: () => void;
  actualPage: number;
  maxPage: number;
  isSubmitError: boolean;
  errorMessage: string;
}

const RateTestFormNavigation: React.FC<IRateTestFormNavigation> = ({
    isPrevButtonVisible,
    isNextButtonVisible,
    handlePrevButtonClick,
    handleNextButtonClick,
    handleSubmitClick,
    actualPage,
    maxPage,
    isSubmitError,
    errorMessage
  }) => {

  return (
    <div className={styles.navigation}>
      <div className={styles.errorMessage}>
        {
          isSubmitError ?
            <p>{errorMessage}</p>
          :
            null
        }
      </div>
      <div className={styles.navigationContainer}>
        <div className={styles.navButtonWrap}>
          <Button
            type="button"
            title="Poprzedni uczeń"
            fontColor="white"
            backgroundColor="lightPurple"
            handleClick={handlePrevButtonClick}
            disabled={!isPrevButtonVisible}
          />
        </div>
        <div className={styles.pageWrap}>
          <p>{actualPage}/{maxPage}</p>
        </div>
        <div className={styles.navButtonWrap}>
          <Button
            type="button"
            title={isNextButtonVisible ? "Następny uczeń" : "Zakończ ocenianie"}
            fontColor="white"
            backgroundColor={isNextButtonVisible ? "lightPurple" : "purple"}
            handleClick={isNextButtonVisible ? handleNextButtonClick : handleSubmitClick}
            disabled={isSubmitError && !isNextButtonVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default RateTestFormNavigation;