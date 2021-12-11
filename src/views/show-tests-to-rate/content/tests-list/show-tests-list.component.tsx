import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-tests-list.module.scss";

// SVGS
import {ReactComponent as SVGArrowDown} from "../../../../assets/svg/arrow_down.svg";

// hooks
import useShowTestsList from "./show-tests-list.hook";

// functions


// components
import Button from "../../../../components/ui/button/button.component";

// interfaces
import {ITestToRate} from "../show-tests-to-rate-content.types";

interface IShowTestsList extends RouteComponentProps<any> {
  filteredTests: ITestToRate[];
}

const ShowTestsList: React.FC<IShowTestsList> = ({
    filteredTests,
    history
  }) => {
  const {
    openedTestsIds,
    toggleOpenedTestsIds
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
                <div className={styles.utils}>
                  <SVGArrowDown
                    className={openedTestsIds.includes(test.id) ? styles.opened : ""}
                  />
                </div>
              </div>
              {
                openedTestsIds.includes(test.id) ?
                  <div className={styles.testDescription}>
                    {/*Other data - to do*/}
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <div className={styles.editButtonWrap}>
                        <Button
                          type="button"
                          fontColor="white"
                          backgroundColor="lightPurple"
                          title="Oceń"
                          handleClick={() => history.push(`/testy/ocen/${test.id}`)}
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