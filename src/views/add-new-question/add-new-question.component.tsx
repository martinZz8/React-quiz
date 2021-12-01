import React from "react";

// styles
import styles from "./add-new-questions.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateContentCenter from "../../templates/content-center/content-center.template";

// components
import AddNewQuestionForm from "./add-form/add-new-question-form.component";

// interfaces
interface IAddNewQuestion {
  appVersion: string;
}

const AddNewQuestion:React.FC<IAddNewQuestion> = ({appVersion}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle="Nowe pytanie">
      <TemplateContentCenter>
        <AddNewQuestionForm/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default AddNewQuestion;