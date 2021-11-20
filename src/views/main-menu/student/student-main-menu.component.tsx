import React from "react";

// styles
import styles from "./student-main-menu.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateContentCenter from "../../../templates/content-center/content-center.template";

// components
import StudentTestsList from "./tests-list/student-tests-list.component";

// interfaces
interface IViewStudentMainMenu {
  appVersion: string;
}

const ViewStudentMainMenu: React.FC<IViewStudentMainMenu> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateContentCenter>
        <StudentTestsList/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewStudentMainMenu;