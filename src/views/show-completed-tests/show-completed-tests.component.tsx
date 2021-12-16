import React from "react";

// styles
import styles from "./show-completed-tests.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import ShowCompletedTestsContent from "./content/show-completed-tests-content.component";

// interfaces
interface IViewShowCompletedTests {
  appVersion: string;
}

const ViewShowCompletedTests:React.FC<IViewShowCompletedTests> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Zakończone testy">
      <TemplateContentCenter>
        <ShowCompletedTestsContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewShowCompletedTests;