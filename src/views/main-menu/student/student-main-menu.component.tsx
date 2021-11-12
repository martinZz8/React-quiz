import React from "react";

// styles
import styles from "./student-main-menu.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateMainMenu from "../../../templates/main-menu/main-menu.template";

// components
import StudentTestsList from "./tests-list/student-tests-list.component";

// interfaces
interface IViewStudentMainMenu {
  appVersion: string;
}

const ViewStudentMainMenu: React.FC<IViewStudentMainMenu> = ({appVersion}) => {

  //TO DO - write main menu layout
  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateMainMenu>
        <StudentTestsList/>
      </TemplateMainMenu>
    </TemplateView>
  );
};

export default ViewStudentMainMenu;