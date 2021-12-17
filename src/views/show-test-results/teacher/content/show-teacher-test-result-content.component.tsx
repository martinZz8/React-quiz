import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./show-teacher-test-result.module.scss";

// hooks
import useShowTeacherTestResultContent from "./show-teacher-test-result-content.hook";

// templates
import TemplateContentCard from "../../../../templates/content-card/content-card.template";

// components
import StudentResultsList from "../../student/content/results-list/student-results-list.component";
import LoadingModal from "../../../../modals/loading-modal/loading-modal.component";
import TeacherTestResultBottomBar from "./bottom-bar/teacher-test-result-bottom-bar.component";

// interfaces
interface IShowStudentTestResultContent extends RouteComponentProps<any> {

}

const ShowStudentTestResultContent: React.FC<IShowStudentTestResultContent> = ({match}) => {
  const {
    resultsArray,
    students,
    areResultsLoading,
    isAccessForbidden,
    activeStudentIndex,
    changeToPrevPage,
    changeToNextPage,
    generateCSVFile,
    generatePDFFile,
    generateDOCXFile
  } = useShowTeacherTestResultContent(match.params.id);

  return (
    <TemplateContentCard
      title={<p>Rezultat testu</p>}
      extendedSize
    >
      <div className={styles.showStudentTestResultContent}>
        {
          !areResultsLoading ?
            (!isAccessForbidden && resultsArray.length > 0) ?
              <>
                 <StudentResultsList
                   results={resultsArray[activeStudentIndex]}
                   actualStudent={students.find(student => student.id === resultsArray[activeStudentIndex].userId)}
                   isTeacherView
                 />
                <TeacherTestResultBottomBar
                  actualPage={activeStudentIndex+1}
                  maxPage={resultsArray.length}
                  onPrevPageClick={changeToPrevPage}
                  onNextPageClick={changeToNextPage}
                  onCSVDownloadClick={generateCSVFile}
                  onPDFDownloadClick={generatePDFFile}
                  onDOCXDownloadClick={generateDOCXFile}
                />
              </>
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