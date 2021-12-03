import React from "react";

// styles
import styles from "./add-new-questions.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import AddNewQuestionForm from "./add-form/add-new-question-form.component";

// interfaces
interface IViewAddNewQuestion {
  appVersion: string;
  isQuestionEdit?: boolean;
}

const ViewAddNewQuestion: React.FC<IViewAddNewQuestion> = ({appVersion, isQuestionEdit}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle={!isQuestionEdit ? "Nowe pytanie" : "Edytuj pytanie"}>
      <TemplateContentCenter>
        <AddNewQuestionForm isQuestionEdit={isQuestionEdit}/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default ViewAddNewQuestion;