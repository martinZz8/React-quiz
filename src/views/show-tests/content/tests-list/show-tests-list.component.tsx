import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-tests-list.module.scss";

// SVGS
import {ReactComponent as SVGArrowDown} from "../../../../assets/svg/arrow_down.svg";

// hooks
import useShowTestsList from "./show-tests-list.hook";

// functions
import translateTestStatus from "../../../../functions/translate-test-status";
import getTimeObject from "../../../../functions/get-time-object";
import formatTimeToString from "../../../../functions/format-time-to-string";
import formatTestDate from "../../../../functions/format-test-date";
import translateQuestionType from "../../../../functions/translate-question-type";

// components
import Button from "../../../../components/ui/button/button.component";

// interfaces
import {IStudent, ITest} from "../show-tests-content.types";
import {IQuestion} from "../../../show-questions/content/show-qeustions-content.types";

interface IShowTestsList extends RouteComponentProps<any> {
  filteredTests: ITest[];
  questions: IQuestion[];
  students: IStudent[];
  setIsDeleteTestModalOpened: (val: boolean) => void;
  setTestIdToBeDeleted: (id: number) => void;
}

const ShowTestsList: React.FC<IShowTestsList> = ({
    filteredTests,
    questions,
    students,
    history,
    setIsDeleteTestModalOpened,
    setTestIdToBeDeleted
  }) => {
  const {
    openedTestsIds,
    toggleOpenedTestsIds,
    calculateMaxPoints
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
                  <div className={`
                    ${styles.statusDot}
                    ${test.status === "ACTIVE" ? styles.green : test.status === "ENDED" ? styles.red : styles.blue}
                  `}/>
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
                        <b>Maksymalne punkty: </b>
                        {
                          calculateMaxPoints(questions.filter(question =>
                            test.questionsId.includes(question.id)
                          ))
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Liczba pytań w teście: </b>
                        {
                          test.numberOfQuestions
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Liczba pytań w puli: </b>
                        {
                          test.questionPoolSize
                        }
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p>
                        <b>Liczba wypełnień testu: </b>
                        {
                          test.executionSize
                        }
                      </p>
                    </div>
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <p><b>Pytania:</b></p>
                    </div>
                    {
                      questions.filter(question => test.questionsId.includes(question.id)).map((question, index) =>
                        <div
                          key={question.id}
                          className={`${styles.row} ${styles.noMarginTop}`}
                        >
                          <p>{index+1}. {question.question} - {translateQuestionType(question.type)}</p>
                        </div>
                      )
                    }
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <p><b>Studenci z dostępem:</b></p>
                    </div>
                    {
                      students.filter(student => test.usersId.includes(student.id)).length > 0 ?
                        students.filter(student => test.usersId.includes(student.id)).map((student, index) =>
                          <div
                            key={student.id}
                            className={`${styles.row} ${styles.column} ${styles.noMarginTop}`}
                          >
                            <p>
                              {index+1}. {student.firstName} {student.lastName}
                            </p>
                            <p className={styles.smallText}>
                              {student.email}
                            </p>
                          </div>
                        )
                      :
                        <div className={styles.row}>
                          -
                        </div>
                    }
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <div className={styles.editButtonWrap}>
                        <Button
                          type="button"
                          fontColor="white"
                          backgroundColor="lightPurple"
                          title="Edytuj"
                          handleClick={() => history.push(`/testy/edytuj/${test.id}`)}
                        />
                      </div>
                      <div className={styles.deleteButtonWrap}>
                        <Button
                          type="button"
                          fontColor="white"
                          backgroundColor="red"
                          title="Usuń"
                          handleClick={() => {
                            setTestIdToBeDeleted(test.id);
                            setIsDeleteTestModalOpened(true);
                          }}
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
          <p>Nie ma żadnych testów</p>
      }
    </div>
  );
};

export default withRouter(ShowTestsList);