import React from "react";

// styles
import styles from "./add-new-questions-answers.module.scss";

// components
import TextArea from "../../../../components/ui/text-area/text-area.component";
import Button from "../../../../components/ui/button/button.component";
import Checkbox from "../../../../components/ui/checkbox/checkbox.component";

// interfaces
import {IQuestionAnswer} from "../../../../types/question.types";

interface IAddNewQuestionAnswers {
  answers: IQuestionAnswer[];
  newAnswer: string;
  openedEditAnswersIds: number[];
  handleNewAnswerInput: (name: string, value: string) => void;
  addAnswer: () => void;
  handleCorrectAnswerChange: (answerId: number, value: boolean) => void;
  toggleOpenedAnswersIds: (id: number) => void;
  removeAnswer: (id: number) => void;
  editAnswer: (id: number, value: string) => void;
}

const AddNewQuestionAnswers: React.FC<IAddNewQuestionAnswers> = ({
     answers,
     newAnswer,
     openedEditAnswersIds,
     handleNewAnswerInput,
     addAnswer,
     handleCorrectAnswerChange,
     toggleOpenedAnswersIds,
     removeAnswer,
     editAnswer
  }) => {

  return (
    <div className={styles.answers}>
      <p className={styles.answersTitle}>Odpowiedzi</p>
      <div className={styles.row}>
        <div className={styles.item}>
          <TextArea
            label="Treść odpowiedzi"
            placeholder="Treść odpowiedzi"
            name="newAnswerInput"
            value={newAnswer}
            handleChange={handleNewAnswerInput}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.addAnswerButtonWrap}>
            <Button
              type="button"
              title="Dodaj"
              fontColor="white"
              backgroundColor="lightPurple"
              handleClick={addAnswer}
              disabled={newAnswer === ""}
            />
          </div>
        </div>
      </div>
      {/*List added answers*/}
      <div className={styles.row}>
        <div className={`${styles.item} ${styles.fullWidth} ${styles.listAnswers}`}>
          {
            answers.length > 0 ?
              answers.map((answer, index) =>
                <div
                  key={answer.id}
                  className={styles.answer}
                >
                  <div className={`${styles.answerContainer} ${openedEditAnswersIds.includes(answer.id) ? styles.openedEdit : ""}`}>
                    <p>{index+1}. {answer.answer}</p>
                    <div className={styles.checkboxWrap}>
                      <Checkbox
                        name="asnwerCheckbox"
                        label="Poprawna odpowiedź"
                        value="correct"
                        checked={answer.correct}
                        handleChange={((name, value) => handleCorrectAnswerChange(answer.id, value !== ""))}
                      />
                    </div>
                    <div className={styles.actionButtons}>
                      <div className={styles.actionButtonWrap}>
                        <Button
                          type="button"
                          title="Edytuj"
                          backgroundColor="lightPurple"
                          fontColor="white"
                          handleClick={() => toggleOpenedAnswersIds(answer.id)}
                        />
                      </div>
                      <div className={styles.actionButtonWrap}>
                        <Button
                          type="button"
                          title="Usuń"
                          backgroundColor="red"
                          fontColor="white"
                          handleClick={() => removeAnswer(answer.id)}
                        />
                      </div>
                    </div>
                  </div>
                  {
                    openedEditAnswersIds.includes(answer.id) ?
                      <div className={styles.editAnswerContainer}>
                        <div className={styles.editInputWrap}>
                          <TextArea
                            label="Treść odpowiedzi"
                            placeholder="Treść odpowiedzi"
                            name="actualAnswerInput"
                            value={answer.answer}
                            handleChange={(name, value) => editAnswer(answer.id, value)}
                          />
                        </div>
                      </div>
                    :
                      null
                  }
                </div>
              )
            :
              <p>Brak odpowiedzi</p>
          }
        </div>
      </div>
    </div>
  );
};

export default AddNewQuestionAnswers;