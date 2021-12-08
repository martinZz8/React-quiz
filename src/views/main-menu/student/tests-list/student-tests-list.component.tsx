import React from "react";

// styles
import styles from "./student-tests-list.module.scss";

// SVGS
import {ReactComponent as SVGNoTests} from "../../../../assets/svg/no_tests.svg";

//redux
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// hooks
import useStudentTestsList from "./student-tests-list.hook";

// templates
import TemplateContentCard from "../../../../templates/content-card/content-card.template";

// components
import LoadingModal from "../../../../modals/loading-modal/loading-modal.component";
import MainMenuHeader from "../../../../components/main-menu-header/main-menu-header.component";
import SingleTest from "./single-test/single-test.component";

const StudentTestsList: React.FC = () => {
  const {isActiveTestsView, setIsActiveTestsView, testsToShow, areTestsLoading} = useStudentTestsList();
  const {firstName} = useTypedSelector(state => state.login.loginData.user);

  return (
    <TemplateContentCard
      title={<p>Cześć <b>{firstName}!</b></p>}
    >
      <div className={styles.testsView}>
        <MainMenuHeader
          firstTitle="Aktywne testy"
          secondTitle="Zakończone testy"
          onFirstTitleClick={() => setIsActiveTestsView(true)}
          onSecondTitleClick={() => setIsActiveTestsView(false)}
          isFirstHeaderActive={isActiveTestsView}
        />
        <div className={`customScrollBar ${styles.testsList} ${testsToShow.length === 0 ? styles.noTests : ""}`}>
          {
            !areTestsLoading ?
              testsToShow.length > 0 ?
                testsToShow.map(test => (
                  <SingleTest
                    key={test.id}
                    testToShow={test}
                    isActiveTestsView={isActiveTestsView}
                  />
                ))
              :
                <>
                  <div className={styles.noTestsImageWrap}>
                    <SVGNoTests/>
                  </div>
                  <div className={styles.noTestsMessage}>
                    <p>
                      Ups...
                      <br/>
                      Brak testów do wyświetlenia.
                    </p>
                  </div>
                </>
            :
              <LoadingModal/>
          }
        </div>
      </div>
    </TemplateContentCard>
  );
};

export default StudentTestsList;