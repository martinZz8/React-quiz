import React from "react";

// styles
import styles from "./main-menu.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateMainMenu from "../../templates/main-menu/main-menu.template";

// interfaces
interface IViewMainMenu {
  appVersion: string;
}

const ViewMainMenu: React.FC<IViewMainMenu> = ({appVersion}) => {

  //TO DO - write main menu layout
  return (
    <TemplateView appVersion={appVersion} viewTitle="Menu">
      <TemplateMainMenu>
        <div>
          Here
        </div>
      </TemplateMainMenu>
    </TemplateView>
  );
};

export default ViewMainMenu;