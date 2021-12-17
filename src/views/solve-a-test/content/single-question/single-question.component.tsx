import React from "react";

// styles
import styles from "./single-question.module.scss";

// interfaces
import {ITestQuestion, IStudentsQuestionAnswer} from "../test-content.types"
import RadioButton from "../../../../components/ui/radio-button/radio-button.component";
import Checkbox from "../../../../components/ui/checkbox/checkbox.component";
import TextArea from "../../../../components/ui/text-area/text-area.component";

interface ISingleQuestion {
  questionOrderNumber: number;
  question: ITestQuestion;
  studentsQuestionAnswer: IStudentsQuestionAnswer | undefined;
  handleAnswerChange: (questionId: number, answerId: number, value: boolean | string) => void;
}

const SingleQuestion: React.FC<ISingleQuestion> = ({questionOrderNumber, question, studentsQuestionAnswer, handleAnswerChange}) => {

  return (
    <div className={styles.singleQuestion}>
      <p className={styles.header}>
        {questionOrderNumber}. {question.question}
      </p>
      <div className={styles.answers}>
        {
          studentsQuestionAnswer ?
            question.type === "SINGLE" ?
              question.answers.map(answer =>
                <div
                  key={answer.id}
                  className={styles.answer}
                >
                  <RadioButton
                    name={`single_${answer.id}`}
                    label={answer.answer}
                    value={answer.answer}
                    checked={studentsQuestionAnswer.selectedAnswerId === answer.id}
                    handleChange={(name, value) => handleAnswerChange(question.id, answer.id, value !== "")}
                  />
                </div>
              )
            : question.type === "MULTI" ?
              question.answers.map(answer =>
                <div
                  key={answer.id}
                  className={styles.answer}
                >
                  <Checkbox
                    name="multi"
                    label={answer.answer}
                    value={answer.answer}
                    checked={studentsQuestionAnswer.selectedAnswerIds?.includes(answer.id)}
                    handleChange={(name, value) => handleAnswerChange(question.id, answer.id, value !== "")}
                  />
                </div>
              )
            :
              <div
                className={styles.answer}
              >
                <TextArea
                  name="open"
                  placeholder="Wpisz swoją odpowiedź..."
                  value={studentsQuestionAnswer?.openAnswer ? studentsQuestionAnswer.openAnswer : ""}
                  handleChange={(name, value) => handleAnswerChange(question.id, 0, value)}
                />
              </div>
          :
            null
        }
      </div>
    </div>
  );
};

export default SingleQuestion;