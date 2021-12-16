import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-tests-list.module.scss";

// SVGS
import {ReactComponent as SVGArrowDown} from "../../../../assets/svg/arrow_down.svg";

// functions
import formatTestDate from "../../../../functions/format-test-date";
import formatTimeToString from "../../../../functions/format-time-to-string";
import getTimeObject from "../../../../functions/get-time-object";

// hooks
import useShowTestsList from "./show-tests-list.hook";

// components
import Button from "../../../../components/ui/button/button.component";

// interfaces
import {ITestToRate} from "../show-completed-tests-content.types";

interface IShowTestsList extends RouteComponentProps<any> {
  filteredTests: ITestToRate[];
}

const ShowTestsList: React.FC<IShowTestsList> = ({
    filteredTests,
    history
  }) => {
  const {
    openedTestsIds,
    toggleOpenedTestsIds,
    translateTestStatus
  } = useShowTestsList();

  return (
    <div className={`customScrollBar ${styles.showTestsList} ${filteredTests.length === 0 ? styles.noTests : ""}`}>
      {
        filteredTests.length > 0 ?
          filteredTests.map((test, index) =>
            <div
              key={test.id}
              className={styles.test}
            >
              <div
                className={styles.testContainer}
                onClick={() => toggleOpenedTestsIds(test.id)}
              >
                <div className={styles.testName}>
                  <p>{index+1}. {test.name}</p>
                </div>
                <div className={styles.testStatus}>
                  <div className={`${styles.dot} ${test.status === "TO_RATE" ? styles.purple : styles.blue}`}/>
                  <p>{translateTestStatus(test.status)}</p>
                </div>
                <div className={styles.utils}>
                  <SVGArrowDown
                    className={openedTestsIds.includes(test.id) ? styles.opened : ""}
                  />
                </div>
              </div>
              {
                openedTestsIds.includes(test.id) ?
                  <div className={styles.testDescription}>
                    <div className={styles.row}>
                      <p>
                        <b>Data startu: </b>
                        {
                          formatTestDate(test.startDate)
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Data końca: </b>
                        {
                          formatTestDate(test.endDate)
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Czas testu: </b>
                        {
                          formatTimeToString(getTimeObject(test.timeInMilliseconds))
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Liczba wykonań: </b>
                        {
                          test.executionSize
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Liczba pytań: </b>
                        {
                          test.numberOfQuestions
                        }
                      </p>
                    </div>
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <div className={`${styles.editButtonWrap} ${test.status === "RATED" ? styles.extendedWidth : ""}`}>
                        <Button
                          type="button"
                          fontColor="white"
                          backgroundColor="lightPurple"
                          title={test.status === "TO_RATE" ? "Oceń" : "Zobacz wyniki"}
                          handleClick={() => history.push(`/testy/${test.status === "TO_RATE" ? "ocen" : "wyniki"}/${test.id}`)}
                        />
                      </div>
                    </div>
                  </div>
                :
                  null
              }
            </div>
          )
        :
          <p>Nie ma żadnych testów do oceny</p>
      }
    </div>
  );
};

export default withRouter(ShowTestsList);