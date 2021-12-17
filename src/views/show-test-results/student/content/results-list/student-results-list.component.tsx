import React from "react";

// styles
import styles from "./student-results-list.module.scss";

// hooks
import useStudentResultsList from "./student-results-list.hook";

// components
import RadioButton from "../../../../../components/ui/radio-button/radio-button.component";
import Checkbox from "../../../../../components/ui/checkbox/checkbox.component";
import TextArea from "../../../../../components/ui/text-area/text-area.component";

// interfaces
import {IResult} from "../show-student-test-result.types";
import {IStudentData} from "../../../teacher/content/show-teacher-test-result-content.types";

interface IStudentResultsList {
  results: IResult;
  actualStudent?: IStudentData;
  isTeacherView?: boolean;
}

const StudentResultsList: React.FC<IStudentResultsList> = ({results, actualStudent, isTeacherView}) => {
  const {checkIfStudentCheckedThatAnswer} = useStudentResultsList();

  return (
    <div className={`customScrollBar ${styles.studentResultsList}`}>
      <div className={styles.section}>
        <div className={styles.header}>
          <p>Informacje o teście</p>
        </div>
        <div className={styles.content}>
          {
            (isTeacherView && actualStudent) ?
              <>
                <p><b>Rozwiązujący uczeń: </b>{actualStudent.firstName} {actualStudent.lastName}</p>
                <p><b>Nazwa użytkownika ucznia: </b>{actualStudent.userName}</p>
                <p><b>Email ucznia: </b>{actualStudent.email}</p>
              </>
            :
              null
          }
          <p><b>Nazwa testu: </b>{results.name}</p>
          <p><b>Data wykonania: </b>{results.dateOfExecution}</p>
          <p><b>Maksymalna ilość punktów do zdobycia: </b>{results.maxPoints}</p>
          <p><b>Zdobyte punkty: </b>{results.totalPoints}</p>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.header}>
          <p>Odpowiedzi na pytania</p>
        </div>
        <div className={styles.content}>
          {
            results.answers.map((answer, index) =>
              <div
                key={answer.id}
                className={styles.answerContainer}
              >
                <div className={styles.question}>
                  <p>{index+1}. {answer.questionText}</p>
                </div>
                <div className={styles.answers}>
                  {
                    answer.questionType !== "DESCRIPTIVE" ?
                      <>
                        <div className={styles.userClosedAnswers}>
                          <p>{!isTeacherView ? "Twoje odpowiedzi:" : "Odpowiedzi studenta:"}</p>
                          <div className={styles.answersSet}>
                            {
                              answer.questionType === "SINGLE" ?
                                answer.correctAnswers.map(correctAnswer =>
                                  <div
                                    key={correctAnswer.id}
                                    className={styles.itemWrap}
                                  >
                                    <RadioButton
                                      name={`userRadioButton_${correctAnswer.id}`}
                                      value="radioButton"
                                      label={correctAnswer.answer}
                                      checked={checkIfStudentCheckedThatAnswer(answer.userAnswers, correctAnswer)}
                                      handleChange={(name, value) => {}}
                                      disabled
                                    />
                                  </div>
                                )
                              :
                                answer.correctAnswers.map(correctAnswer =>
                                  <div
                                    key={correctAnswer.id}
                                    className={styles.itemWrap}
                                  >
                                    <Checkbox
                                      name="checkBox"
                                      value="checkBox"
                                      label={correctAnswer.answer}
                                      checked={checkIfStudentCheckedThatAnswer(answer.userAnswers, correctAnswer)}
                                      handleChange={(name, value) => {}}
                                      disabled
                                    />
                                  </div>
                                )
                            }
                          </div>
                        </div>
                        <div className={styles.correctAnswers}>
                          <p>Prawidłowe odpowiedzi:</p>
                          <div className={styles.answersSet}>
                            {
                              answer.questionType === "SINGLE" ?
                                answer.correctAnswers.map(correctAnswer =>
                                  <div
                                    key={correctAnswer.id}
                                    className={styles.itemWrap}
                                  >
                                    <RadioButton
                                      name={`correctRadioButton_${correctAnswer.id}`}
                                      value="radioButton"
                                      label={correctAnswer.answer}
                                      checked={correctAnswer.correct}
                                      handleChange={(name, value) => {}}
                                      disabled
                                    />
                                  </div>
                                )
                              :
                                answer.correctAnswers.map(correctAnswer =>
                                  <div
                                    key={correctAnswer.id}
                                    className={styles.itemWrap}
                                  >
                                    <Checkbox
                                      name="checkBox"
                                      value="checkBox"
                                      label={correctAnswer.answer}
                                      checked={correctAnswer.correct}
                                      handleChange={(name, value) => {}}
                                      disabled
                                    />
                                  </div>
                                )
                            }
                          </div>
                        </div>
                      </>
                    :
                      <div className={styles.userOpenedAnswer}>
                        <TextArea
                          name="textArea"
                          placeholder={"Brak odpowiedzi"}
                          value={answer?.descriptiveAnswerText ? answer.descriptiveAnswerText: ""}
                          handleChange={(name, value) => {}}
                          disabled
                        />
                      </div>
                  }
                </div>
                <div className={styles.extraData}>
                  <p><b>Zdobyte punkty: </b>{answer.answerRatedPoints} / {answer.questionPoints}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default StudentResultsList;