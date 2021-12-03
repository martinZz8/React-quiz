import React, {useEffect} from "react";

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
  isQuestionEdit?: boolean;
}

const AddNewQuestion:React.FC<IAddNewQuestion> = ({appVersion, isQuestionEdit}) => {

  return (
    <TemplateView appVersion={appVersion} viewTitle={!isQuestionEdit ? "Nowe pytanie" : "Edytuj pytanie"}>
      <TemplateContentCenter>
        <AddNewQuestionForm isQuestionEdit={isQuestionEdit}/>
      </TemplateContentCenter>
    </TemplateView>
  );
};

export default AddNewQuestion;