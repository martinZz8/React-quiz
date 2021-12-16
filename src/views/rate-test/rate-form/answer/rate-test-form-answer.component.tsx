import React from "react";

// styles
import styles from "./rate-test-form-answer.module.scss";

// components
import TextArea from "../../../../components/ui/text-area/text-area.component";
import Checkbox from "../../../../components/ui/checkbox/checkbox.component";
import InputFieldFilled from "../../../../components/ui/input-field-filled/input-field-filled.component";

// interfaces
import {IQuestion, ISingleStudentAnswer} from "../rate-test-form.types";

interface IRateTestFormAnswer {
  ordinalNumber: number;
  question: IQuestion | undefined;
  studentAnswer: ISingleStudentAnswer;
  ratingValue: string;
  handleRatingChange: (value: string) => void;
}

const RateTestFormAnswer: React.FC<IRateTestFormAnswer> = ({
    ordinalNumber,
    question,
    studentAnswer,
    ratingValue,
    handleRatingChange
  }) => {

  return (
    <div className={styles.answerContainer}>
      <div className={styles.questionText}>
        <p>{ordinalNumber}. {question?.question}</p>
      </div>
      <div className={`${styles.answer} ${question?.type !== "DESCRIPTIVE" ? styles.open : ""}`}>
        {
          question?.type === "DESCRIPTIVE" ?
            <TextArea
              name="textArea"
              value={studentAnswer?.writtenOpenedAnswer ? studentAnswer.writtenOpenedAnswer : ""}
              placeholder="Brak odpowiedzi."
              handleChange={(name, value) => {}}
              disabled
            />
          :
            <>
              <div className={styles.studentsAnswer}>
                <p className={styles.title}>Odpowiedzi studenta:</p>
                {
                  question?.answers.map(answer =>
                    <div
                      className={styles.answerPart}
                      key={answer.id}
                    >
                      <Checkbox
                        name="checkbox"
                        label={answer.answer}
                        checked={studentAnswer.selectedClosedAnswersIds?.includes(answer.id)}
                        value="answer"
                        handleChange={(name, value) => {}}
                        disabled
                      />
                    </div>
                  )
                }
              </div>
              <div className={styles.correctAnswer}>
                <p className={styles.title}>Prawidłowe odpowiedzi:</p>
                {
                  question?.answers.map(answer =>
                    <div
                      className={styles.answerPart}
                      key={answer.id}
                    >
                      <Checkbox
                        name="checkbox"
                        label={answer.answer}
                        checked={answer.correct}
                        value="answer"
                        handleChange={(name, value) => {}}
                        disabled
                      />
                    </div>
                  )
                }
              </div>
            </>
        }
      </div>
      <div className={styles.rateAnswer}>
        <div className={styles.ratingContainer}>
          <p>Przyznaj punkty:</p>
          <div className={styles.inputWrap}>
            <InputFieldFilled
              name="inputFieldFilled"
              value={ratingValue}
              handleChange={(name, value) => handleRatingChange(value)}
            />
          </div>
          <p className={styles.maxPoints}>/{question?.maxPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default RateTestFormAnswer;