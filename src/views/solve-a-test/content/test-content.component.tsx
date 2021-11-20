import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

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

// interfaces
interface ITestContent extends RouteComponentProps<any> {

}

const TestContent: React.FC<ITestContent> = ({match}) => {
  const {testQuestions, areTestQuestionsLoading, isTestStarted, startTheTest, timeLeft, isTestSubmittedManually, submitTestManually} = useTestContent(match.params.id);

  return (
    <TemplateContentCard>
      <div className={styles.testContentView}>
        {
          !areTestQuestionsLoading ?
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
                isTestStarted ?
                  timeLeft > 0 ?
                    <div className={`customScrollBar ${styles.contentContainer} ${styles.questions}`}>
                      <p>Here</p>
                      <div className={styles.buttonWrap}>
                        <Button
                          type="button"
                          title="Zakończ test"
                          backgroundColor="lightPurple"
                          fontColor="white"
                          handleClick={submitTestManually}
                        />
                      </div>
                    </div>
                    :
                    <div className={`${styles.contentContainer} ${styles.endOfTest}`}>
                      <div className={styles.message}>
                        <p>
                          Koniec testu
                          <br/>
                          Rezultat został{isTestSubmittedManually ? "" : " automatycznie"} przesłany do systemu
                        </p>
                      </div>
                    </div>
                  :
                  <div className={`${styles.contentContainer} ${styles.startTest}`}>
                    <div className={styles.message}>
                      <p>Rozpocznij test. Test trwa X minut, a po upłynięciu czasu zostanie automatycznie wysłany do systemu.</p>
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
              }
            </>
          :
            <LoadingModal/>
        }
      </div>
    </TemplateContentCard>
  );
};

export default withRouter(TestContent);