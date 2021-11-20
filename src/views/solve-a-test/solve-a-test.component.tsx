import React from "react";

// styles
import styles from "./solve-a-test.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import TestContent from "./content/test-content.component";

// interfaces
interface IViewSolveATest {
  appVersion: string;
}

const ViewSolveATest: React.FC<IViewSolveATest> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Rozwiąż test">
      <TemplateContentCenter>
        <TestContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewSolveATest;