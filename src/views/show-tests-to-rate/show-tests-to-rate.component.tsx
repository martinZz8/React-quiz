import React from "react";

// styles
import styles from "./show-tests-to-rate.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import ShowTestToRateContent from "./content/show-tests-to-rate-content.component";

// interfaces
interface IViewShowTestsToRate {
  appVersion: string;
}

const ViewShowTestsToRate:React.FC<IViewShowTestsToRate> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Testy do oceny">
      <TemplateContentCenter>
        <ShowTestToRateContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewShowTestsToRate;