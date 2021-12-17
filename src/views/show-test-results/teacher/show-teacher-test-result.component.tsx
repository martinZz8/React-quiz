import React from "react";

// styles
import styles from "./show-teacher-test-result.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateContentCenter from "../../../templates/content-center/content-center.template";

// components
import ShowStudentTestResultContent from "./content/show-teacher-test-result-content.component";

// interfaces
interface IViewShowTeacherTestResult {
  appVersion: string;
}

const ViewShowTeacherTestResult:React.FC<IViewShowTeacherTestResult> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Rezultat testu">
      <TemplateContentCenter>
        <ShowStudentTestResultContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewShowTeacherTestResult;