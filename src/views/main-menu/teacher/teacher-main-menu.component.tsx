import React from "react";

// styles
import styles from "./teacher-main-menu.module.scss";

// templates
import TemplateView from "../../../templates/view/view.template";
import TemplateMainMenu from "../../../templates/main-menu/main-menu.template";

// interfaces
interface IViewTeacherMainMenu {
  appVersion: string;
}

const ViewTeacherMainMenu: React.FC<IViewTeacherMainMenu> = ({appVersion}) => {

  //TO DO - write main menu layout
  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateMainMenu>
        <div>
          Here teacher
        </div>
      </TemplateMainMenu>
    </TemplateView>
  );
};

export default ViewTeacherMainMenu;