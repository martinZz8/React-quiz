import React from "react";

// styles
import styles from "./show-questions.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import ShowQuestionsContent from "./content/show-questions-content.component";

// interfaces
interface IShowQuestions {
  appVersion: string;
}

const ShowQuestions:React.FC<IShowQuestions> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Twoje pytania">
      <TemplateContentCenter>
        <ShowQuestionsContent/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ShowQuestions;