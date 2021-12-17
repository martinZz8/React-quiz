import React from "react";

// styles
import styles from "./show-student-test-result.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateContentCenter from "../../../templates/content-center/content-center.template";

// components
import ShowStudentTestResultContent from "./content/show-student-test-result-content.component";

// interfaces
interface IViewShowStudentTestResult {
  appVersion: string;
}

const ViewShowStudentTestResult:React.FC<IViewShowStudentTestResult> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Rezultat testu">
      <TemplateContentCenter>
        <ShowStudentTestResultContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewShowStudentTestResult;