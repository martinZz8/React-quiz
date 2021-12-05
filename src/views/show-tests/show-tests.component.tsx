import React from "react";

// styles
import styles from "./show-tests.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import ShowTestsContent from "./content/show-tests-content.component";

// interfaces
interface IViewShowTests {
  appVersion: string;
}

const ViewShowTests:React.FC<IViewShowTests> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Twoje testy">
      <TemplateContentCenter>
        <ShowTestsContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewShowTests;