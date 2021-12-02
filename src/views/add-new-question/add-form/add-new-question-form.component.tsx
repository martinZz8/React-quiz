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
import Button from "../../../components/ui/button/button.component";
import AddNewQuestionAnswers from "./answers/add-new-question-answers.component";

const AddNewQuestionForm: React.FC = () => {
  const {
    newQuestionInput,
    handleNewQuestionInput,
    newAnswerInput,
    handleNewAnswerInput,
    handleCorrectAnswerChange,
    submitNewQuestionForm,
    addAnswer,
    removeAnswer,
    editAnswer,
    openedEditAnswersIds,
    toggleOpenedAnswersIds,
    newQuestionInputErrors,
    isSuccessCreation
  } = useAddNewQuestionForm();

  return (
    <TemplateContentCard
      title={<p>Dodaj nowe pytanie</p>}
    >
      <form
        className={`customScrollBar ${styles.addNewQuestionForm}`}
        onSubmit={submitNewQuestionForm}
        noValidate
      >
        {/*Questions inputs*/}
        <div className={styles.row}>
          <div className={`${styles.item} ${styles.fullWidth}`}>
            <InputField
              type="text"
              label="Treść pytania"
              placeholder="Treść pytania"
              name="question"
              value={newQuestionInput.question}
              handleChange={handleNewQuestionInput}
              isError={newQuestionInputErrors.question !== ""}
              errorMessage={newQuestionInputErrors.question}
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
              value={newQuestionInput.points}
              handleChange={handleNewQuestionInput}
              isError={newQuestionInputErrors.points !== ""}
              errorMessage={newQuestionInputErrors.points}
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
              isError={newQuestionInputErrors.type !== ""}
              errorMessage={newQuestionInputErrors.type}
            />
          </div>
        </div>
        {/*Answers*/}
        {
          newQuestionInput.type === "MULTI" || newQuestionInput.type === "SINGLE" ?
            <AddNewQuestionAnswers
              answers={newQuestionInput.answers}
              newAnswer={newAnswerInput.answer}
              openedEditAnswersIds={openedEditAnswersIds}
              handleNewAnswerInput={handleNewAnswerInput}
              addAnswer={addAnswer}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              toggleOpenedAnswersIds={toggleOpenedAnswersIds}
              removeAnswer={removeAnswer}
              editAnswer={editAnswer}
            />
          :
            null
        }
        {/*Error box*/}
        <div className={styles.row}>
          <div className={`${styles.item} ${styles.fullWidth} ${styles.messageBoxWrap}`}>
            {
              isSuccessCreation || newQuestionInputErrors.answers !== "" || newQuestionInputErrors.APIError !== "" ?
                <div className={`${styles.messageBox} ${isSuccessCreation ? styles.successMessage : styles.errorMessage}`}>
                  <p>
                    {
                      isSuccessCreation ?
                        "Poprawnie utworzono pytanie"
                      : newQuestionInputErrors.APIError !== "" ?
                        newQuestionInputErrors.APIError
                      :
                        newQuestionInputErrors.answers
                    }
                  </p>
                </div>
              :
                null
            }
          </div>
        </div>
        {/*Submit button*/}
        <div className={styles.row}>
          <div className={`${styles.item} ${styles.fullWidth} ${styles.submitButtonWrap}`}>
            <Button
              type="submit"
              title="Utwórz pytanie"
              backgroundColor="lightPurple"
              fontColor="white"
            />
          </div>
        </div>
      </form>
    </TemplateContentCard>
  );
};

export default AddNewQuestionForm;