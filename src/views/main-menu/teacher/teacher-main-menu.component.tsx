import React from "react";

// styles
import styles from "./teacher-main-menu.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateContentCenter from "../../../templates/content-center/content-center.template";

// components
import TeacherCardsList from "./cards-list/teacher-cards-list.component";

// interfaces
interface IViewTeacherMainMenu {
  appVersion: string;
}

const ViewTeacherMainMenu: React.FC<IViewTeacherMainMenu> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateContentCenter>
        <TeacherCardsList/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewTeacherMainMenu;