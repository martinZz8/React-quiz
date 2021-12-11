import React from "react";

// styles
import styles from "./rate-test.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import RateTestForm from "./rate-form/rate-test-form.component";

// interfaces
interface IViewRateTest {
  appVersion: string;
}

const ViewRateTest: React.FC<IViewRateTest> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Oceń test">
      <TemplateContentCenter>
        <RateTestForm/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewRateTest;