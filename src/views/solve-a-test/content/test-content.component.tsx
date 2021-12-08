import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {NavLink} from "react-router-dom";

// styles
import styles from "./test-content.module.scss";

// functions
import getTimeObject from "../../../functions/get-time-object";
import formatTimeToString from "../../../functions/format-time-to-string";

// hooks
import useTestContent from "./test-content.hook";

// templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// components
import Button from "../../../components/ui/button/button.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import SingleQuestion from "./single-question/single-question.component";
import DeleteItemModal from "../../../modals/delete-item-modal/delete-question-modal.component";

// interfaces
interface ITestContent extends RouteComponentProps<any> {

}

const TestContent: React.FC<ITestContent> = ({match}) => {
  const {
    testQuestions,
    testData,
    studentsQuestionsAnswers,
    handleAnswerChange,
    areTestQuestionsLoading,
    isTestAccessForbidden,
    isTestStarted,
    startTheTest,
    timeLeft,
    isTestSubmittedManually,
    submitTestManually,
    getTestTimeInfo,
    isSubmitModalOpened,
    setIsSubmitModalOpened,
    isTestSubmitting,
    isTestStartedTooLate,
    isErrorTestSubmit
  } = useTestContent(match.params.id);

  return (
    <TemplateContentCard>
      <div className={styles.testContentView}>
        {
          !areTestQuestionsLoading && !isTestSubmitting ?
            !isTestAccessForbidden ?
              <>
                <div className={styles.header}>
                  <div className={styles.title}>
                    <p>Test zaliczeniowy</p>
                  </div>
                  {
                    isTestStarted ?
                      <div className={styles.counter}>
                        <p>Do zakończenia: {formatTimeToString(getTimeObject(timeLeft))}</p>
                      </div>
                    :
                      null
                  }
                </div>
                {
                  !isTestStartedTooLate ?
                    isTestStarted ?
                      timeLeft > 0 ?
                        <div className={`customScrollBar ${styles.contentContainer} ${styles.questions}`}>
                          {
                            testQuestions.map((question, index) =>
                              <div
                                key={question.id}
                                className={styles.questionWrap}
                              >
                                <SingleQuestion
                                  questionOrderNumber={index+1}
                                  question={question}
                                  studentsQuestionAnswer={studentsQuestionsAnswers.find(answer => answer.questionId === question.id)}
                                  handleAnswerChange={handleAnswerChange}
                                />
                              </div>
                            )
                          }
                          <div className={styles.buttonWrapContainer}>
                            <div className={styles.buttonWrap}>
                              <Button
                                type="button"
                                title="Zakończ test"
                                backgroundColor="lightPurple"
                                fontColor="white"
                                handleClick={() => setIsSubmitModalOpened(true)}
                              />
                            </div>
                          </div>
                        </div>
                      :
                        <div className={`${styles.contentContainer} ${styles.endOfTest}`}>
                          <div className={styles.message}>
                            <p>{`Koniec testu${!isTestSubmittedManually ? " (skończył się czas)" : ""}.`}</p>
                            {
                              !isErrorTestSubmit ?
                                <>
                                  <p>Rezultat został{isTestSubmittedManually ? "" : " automatycznie"} przesłany do systemu.</p>
                                  <NavLink
                                    to="/"
                                  >
                                    Powrót do strony głównej
                                  </NavLink>
                                </>
                              :
                                <>
                                  <p>Wystapił błąd podczas przesyłania odpowiedzi.</p>
                                  <div className={styles.buttonWrap} style={{marginTop: "6px"}}>
                                    <Button
                                      type="button"
                                      title="Ponów przesłanie"
                                      backgroundColor="lightPurple"
                                      fontColor="white"
                                      handleClick={submitTestManually}
                                    />
                                  </div>
                                </>
                            }
                          </div>
                        </div>
                    :
                      <div className={`${styles.contentContainer} ${styles.startTest}`}>
                        <div className={styles.message}>
                          <p>Rozpocznij test "{testData.name}".</p>
                          <p>Test trwa {getTestTimeInfo()}.</p>
                          <p>Po upłynięciu czasu, zaznaczone odpowiedzi zostaną automatycznie wysłane do systemu.</p>
                        </div>
                        <div className={styles.buttonWrap}>
                          <Button
                            type="button"
                            title="Start"
                            backgroundColor="lightPurple"
                            fontColor="white"
                            disabled={testQuestions.length === 0}
                            handleClick={startTheTest}
                          />
                        </div>
                      </div>
                  :
                    <div className={`${styles.contentContainer} ${styles.startTest}`}>
                      <div className={styles.message}>
                        <p>Test nie jest już aktywny - został rozpoczęty za późno.</p>
                        <p>Skontaktuj się z nauczycielem w celu dalszych instrukcji.</p>
                      </div>
                    </div>
                }
              </>
            :
              <div className={styles.noAccess}>
                <p>
                  Nie ma testu o podanym numerze ID albo nie masz do niego dostępu.
                </p>
              </div>
          :
            <LoadingModal
              message={isTestSubmitting ? "Przesyłanie odpowiedzi..." : undefined}
            />
        }
        {
          isSubmitModalOpened ?
            <DeleteItemModal
              title="Czy na pewno chcesz zakonczyć test i przesłać odpowiedzi?"
              onConfirmClick={submitTestManually}
              onDeclineClick={() => setIsSubmitModalOpened(false)}
              isDeleteProcessing={false}
            />
          :
            null
        }
      </div>
    </TemplateContentCard>
  );
};

export default withRouter(TestContent);