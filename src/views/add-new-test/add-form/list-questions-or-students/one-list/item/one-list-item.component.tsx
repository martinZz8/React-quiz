import React, {useState} from "react";

// styles
import styles from "./one-list-item.module.scss";

// SVGS
import {ReactComponent as SVGArrowDown} from "../../../../../../assets/svg/arrow_down_v2.svg";

// functions
import translateQuestionType from "../../../../../../functions/translate-question-type";

// components
import Button from "../../../../../../components/ui/button/button.component";

// interfaces
import {IQuestion, IStudent} from "../../list-questions-or-students.types";

interface IOneListItem {
  isAvailableView?: boolean;
  questionToShow?: IQuestion;
  studentToShow?: IStudent;
  ordinalNumber: number;
  isOpened: boolean;
  onItemClick: () => void;
  onAddOrRemoveClick: () => void;
}

const OneListItem: React.FC<IOneListItem> = ({
   isAvailableView,
   questionToShow,
   studentToShow,
   ordinalNumber,
   isOpened,
   onItemClick,
   onAddOrRemoveClick
  }) => {
  const [isQuestionShow, setIsQuestionShow] = useState<boolean>(questionToShow !== undefined);

  return (
    <div className={styles.oneListItem}>
      {
        isQuestionShow ?
          <div className={styles.itemWrap}>
            <div
              className={styles.titleWrap}
              onClick={onItemClick}
            >
              <p>{ordinalNumber}. {questionToShow?.question}</p>
              <div className={styles.arrowWrap}>
                <SVGArrowDown className={isOpened ? styles.opened : ""}/>
              </div>
            </div>
            {/*Extra content*/}
            {
              isOpened ?
                <div className={styles.extraContentWrap}>
                  <div className={styles.oneItemWrap}>
                    <p><b>Typ: </b>{questionToShow?.type ? translateQuestionType(questionToShow?.type) : "-"}</p>
                  </div>
                  <div className={styles.oneItemWrap}>
                    <p><b>Punkty: </b>{questionToShow?.points}</p>
                  </div>
                  <div className={styles.oneItemWrap}>
                    <p><b>Odpowiedzi:</b></p>
                  </div>
                  <div className={`${styles.oneItemWrap} ${styles.column}`}>
                    {
                      questionToShow?.type !== "DESCRIPTIVE" ?
                        questionToShow?.answers.map((answer, index) =>
                          <p
                            key={answer.id}
                          >
                            {index+1}. {answer.answer} - <span className={answer.correct ? styles.green : styles.red}>{answer.correct ? "Prawda" : "Fałsz"}</span>
                          </p>
                        )
                      :
                        <p>Pytanie otwarte</p>
                    }
                  </div>
                </div>
              :
                null
            }
            <div className={styles.buttonsWrap}>
              <div className={styles.buttonWrap}>
                <Button
                  type="button"
                  title={isAvailableView ? "Dodaj" : "Usuń"}
                  fontColor="white"
                  backgroundColor={isAvailableView ? "lightPurple" : "red"}
                  handleClick={onAddOrRemoveClick}
                />
              </div>
            </div>
          </div>
        :
          <div className={styles.itemWrap}>
            <div
              className={styles.titleWrap}
              onClick={onItemClick}
            >
              <div className={styles.doubleTitle}>
                <p>{ordinalNumber}. {studentToShow?.firstName} {studentToShow?.lastName}</p>
                <p className={styles.smallText}>{studentToShow?.email}</p>
              </div>
              <div className={`${styles.arrowWrap} ${isOpened ? styles.opened : ""}`}>
                <SVGArrowDown className={isOpened ? styles.opened : ""}/>
              </div>
            </div>
            {/*Extra content*/}
            {
              isOpened ?
                <div className={styles.extraContentWrap}>
                  <div className={styles.oneItemWrap}>
                    <p><b>Nazwa użytkownika: </b>{studentToShow?.username}</p>
                  </div>
                </div>
              :
                null
            }
            <div className={styles.buttonsWrap}>
              <div className={styles.buttonWrap}>
                <Button
                  type="button"
                  title={isAvailableView ? "Dodaj" : "Usuń"}
                  fontColor="white"
                  backgroundColor={isAvailableView ? "lightPurple" : "red"}
                  handleClick={onAddOrRemoveClick}
                />
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default OneListItem;