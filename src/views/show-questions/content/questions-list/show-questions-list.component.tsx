import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-questions-list.module.scss";

// SVGS
import {ReactComponent as SVGArrowDown} from "../../../../assets/svg/arrow_down.svg";

// hooks
import useShowQuestionsList from "./show-questions-list.hook";

// functions
import translateQuestionType from "../../../../functions/translate-question-type";

// componenets
import Button from "../../../../components/ui/button/button.component";

// interfaces
import {IQuestion} from "../show-qeustions-content.types";

interface IShowQuestionsList extends RouteComponentProps<any> {
  filteredQuestions: IQuestion[];
}

const ShowQuestionsList: React.FC<IShowQuestionsList> = ({filteredQuestions, history}) => {
  const {openedQuestionsIds, toggleOpenedQuestionsIds} = useShowQuestionsList();

  return (
    <div className={`customScrollBar ${styles.showQuestionsList} ${filteredQuestions.length === 0 ? styles.noQuestions : ""}`}>
      {
        filteredQuestions.length > 0 ?
          filteredQuestions.map((question, index) =>
            <div
              key={question.id}
              className={styles.question}
            >
              <div
                className={styles.questionContainer}
                onClick={() => toggleOpenedQuestionsIds(question.id)}
              >
                <div className={styles.questionText}>
                  <p>{index+1}. {question.question}</p>
                </div>
                <div className={styles.questionType}>
                  <p>{translateQuestionType(question.type)}</p>
                </div>
                <div className={styles.utils}>
                  <SVGArrowDown
                    className={openedQuestionsIds.includes(question.id) ? styles.opened : ""}
                  />
                </div>
              </div>
              {
                openedQuestionsIds.includes(question.id) ?
                  <div className={styles.questionDescription}>
                    <div className={styles.row}>
                      <p>
                        <b>Maksymalne punkty: </b>
                        {question.points}
                      </p>
                      <p>
                        <b>Należy do testów: </b>
                        {
                          question.testsName.length > 0 ?
                            question.testsName.map(testName => testName)
                          :
                            "-"
                        }
                      </p>
                    </div>
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <p><b>Pytania:</b></p>
                    </div>
                    {
                      question.type !== "DESCRIPTIVE" ?
                        question.answers.map((answer, index) =>
                          <div
                            key={answer.id}
                            className={styles.row}
                          >
                            <p>{index+1}. {answer.answer} - </p>
                            <p className={answer.correct ? styles.green : styles.red}>{answer.correct ? "Prawda" : "Fałsz"}</p>
                          </div>
                        )
                      :
                        <div className={styles.row}>
                          <p>Pytanie otwarte</p>
                        </div>
                    }
                    <div className={styles.row} style={{marginTop: "10px"}}>
                      <div className={styles.editButtonWrap}>
                        <Button
                          type="button"
                          fontColor="white"
                          backgroundColor="lightPurple"
                          title="Edytuj"
                          handleClick={() => history.push(`/pytania/edytuj/${question.id}`)}
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
          <p>Nie ma żadnych pytań</p>
      }
    </div>
  );
};

export default withRouter(ShowQuestionsList);