import React from "react";
import {withRouter, RouteComponentProps} from "react-router";

// styles
import styles from "./single-test.module.scss";

// components
import Button from "../../../../../components/ui/button/button.component";

// interfaces
import {ITestsToShow} from "../student-tests-list.types";

interface ISingleTest extends RouteComponentProps {
  testToShow: ITestsToShow;
  isActiveTestsView: boolean;
}

const SingleTest: React.FC<ISingleTest> = ({history, testToShow, isActiveTestsView}) => {

  return (
    <div
      className={styles.singleTest}
      onClick={() => {
        if (isActiveTestsView) {
          history.push(`/testy/rozwiaz/${testToShow.id}`);
        }
        else {
          history.push(`/testy/wyniki/${testToShow.id}`);
        }
      }}
    >
      <div className={styles.oneData}>
        <p className={styles.title}>Nazwa</p>
        <p className={styles.content}>{testToShow.name ? testToShow.name : "-"}</p>
      </div>
      <div className={styles.oneData}>
        <p className={styles.title}>Autor</p>
        <p className={styles.content}>{testToShow.author ? testToShow.author : "-"}</p>
      </div>
      <div className={styles.oneData}>
        <p className={styles.title}>Data rozpoczęcia</p>
        <p className={styles.content}>{testToShow.startDate ? testToShow.startDate : "-"}</p>
      </div>
      <div className={styles.oneData}>
        <p className={styles.title}>Data zakończenia</p>
        <p className={styles.content}>{testToShow.endDate ? testToShow.endDate : "-"}</p>
      </div>
      <div className={styles.oneData}>
        <p className={styles.title}>Czas</p>
        <p className={styles.content}>{testToShow.time ? testToShow.time : "-"}</p>
      </div>
      <div className={styles.actionButton}>
        <Button
          type="button"
          title={isActiveTestsView ? "Rozpocznij" : "Zobacz wyniki"}
          fontColor="white"
          backgroundColor="lightPurple"
          noBorderRadius
        />
      </div>
    </div>
  );
};

export default withRouter(SingleTest);