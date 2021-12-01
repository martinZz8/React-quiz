import React from "react";

// styles
import styles from "./add-new-question-form.module.scss";

// data
import {selectQuestionTypeOptions} from "./add-new-question.data";

// templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// hooks
import useAddNewQuestionForm from "./add-new-question-form.hook";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import Select from "../../../components/ui/select/select.component";

const AddNewQuestionForm: React.FC = () => {
  const {newQuestionInput, handleNewQuestionInput, newAnswerInput, handleAnswerChange, handleCorrectAnswerChange, submitForm} = useAddNewQuestionForm();

  return (
    <TemplateContentCard
      title={<p>Dodaj nowe pytanie</p>}
    >
      <form
        className={`customScrollBar ${styles.addNewQuestionForm}`}
        onSubmit={submitForm}
        noValidate
      >
        <div className={styles.row}>
          <div className={`${styles.item} ${styles.fullWidth}`}>
            <InputField
              type="text"
              label="Treść pytania"
              placeholder="Treść pytania"
              name="question"
              value={newQuestionInput.question}
              handleChange={handleNewQuestionInput}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.item}`}>
            <InputField
              type="number"
              label="Maksymalne punkty"
              placeholder="Maksymalne punkty"
              name="points"
              value={newQuestionInput.points.toString()}
              handleChange={handleNewQuestionInput}
            />
          </div>
          <div className={`${styles.item}`}>
            <Select
              name="type"
              value={newQuestionInput.type}
              label="Typ pytania"
              placeholder="Typ pytania"
              options={selectQuestionTypeOptions}
              handleChange={handleNewQuestionInput}
            />
          </div>
        </div>
      </form>
    </TemplateContentCard>
  );
};

export default AddNewQuestionForm;