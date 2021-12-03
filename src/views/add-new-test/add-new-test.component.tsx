import React from "react";

// styles
import styles from "./add-new-test.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import AddNewTestForm from "./add-form/add-new-test-form.component";

// interfaces
interface IViewAddNewTest {
  appVersion: string;
  isTestEdit?: boolean;
}

const ViewAddNewTest: React.FC<IViewAddNewTest> = ({appVersion, isTestEdit}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle={!isTestEdit ? "Nowy test" : "Edytuj test"}>
      <TemplateContentCenter>
        <AddNewTestForm isTestEdit={isTestEdit}/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewAddNewTest;