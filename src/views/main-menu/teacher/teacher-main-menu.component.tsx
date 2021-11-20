import React from "react";

// styles
import styles from "./teacher-main-menu.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateContentCenter from "../../../templates/content-center/content-center.template";

// interfaces
interface IViewTeacherMainMenu {
  appVersion: string;
}

const ViewTeacherMainMenu: React.FC<IViewTeacherMainMenu> = ({appVersion}) => {

  //TO DO - write main menu layout
  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateContentCenter>
        <div>
          Here teacher
        </div>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewTeacherMainMenu;