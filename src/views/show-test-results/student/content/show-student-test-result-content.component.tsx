import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-student-test-result.module.scss";

// hooks
import useShowStudentTestResultContent from "./show-student-test-result-content.hook";

// templates
import TemplateContentCard from "../../../../templates/content-card/content-card.template";

// components
import LoadingModal from "../../../../modals/loading-modal/loading-modal.component";
import StudentResultsList from "./results-list/student-results-list.component";

// interfaces
interface IShowStudentTestResultContent extends RouteComponentProps<any> {

}

const ShowStudentTestResultContent: React.FC<IShowStudentTestResultContent> = ({match}) => {
  const {
    results,
    areResultsLoading,
    isAccessForbidden
  } = useShowStudentTestResultContent(match.params.id);


  return (
    <TemplateContentCard
      title={<p>Rezultat testu</p>}
      extendedSize
    >
      <div className={styles.showStudentTestResultContent}>
        {
          !areResultsLoading ?
            !isAccessForbidden ?
              <StudentResultsList
                results={results}
              />
            :
              <div className={styles.forbiddenContainer}>
                <p>Nie ma takiego rezultatu testu, nie masz do niego dostępu albo test nie został jeszcze oceniony.</p>
              </div>
          :
            <LoadingModal/>
        }
      </div>
    </TemplateContentCard>
  );
};

export default withRouter(ShowStudentTestResultContent);