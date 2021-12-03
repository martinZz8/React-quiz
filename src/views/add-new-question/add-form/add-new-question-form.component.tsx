import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

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
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";

// interfaces
interface IAddNewQuestionForm extends RouteComponentProps<any> {
  isQuestionEdit?: boolean;
}

const AddNewQuestionForm: React.FC<IAddNewQuestionForm> = ({isQuestionEdit, match}) => {
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
    isSuccessCreation,
    resetAnswers,
    isQuestionForEditLoading,
    isQuestionForEditForbidden
  } = useAddNewQuestionForm(match.params.id, isQuestionEdit);

  return (
    <TemplateContentCard
      title={<p>{!isQuestionEdit ? "Dodaj nowe pytanie" : "Edytuj pytanie"}</p>}
    >
      <form
        className={`customScrollBar ${styles.addNewQuestionForm} ${isQuestionForEditForbidden ? styles.forbidden : ""}`}
        onSubmit={submitNewQuestionForm}
        noValidate
      >
        {
          !isQuestionForEditLoading ?
            !isQuestionForEditForbidden ?
              <>
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
                      handleChange={(name: string, value: string) => {
                        handleNewQuestionInput(name, value);
                        resetAnswers();
                      }}
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
                                !isQuestionEdit ? "Poprawnie utworzono pytanie" : "Poprawnie edytowano pytanie"
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
                      title={!isQuestionEdit ? "Utwórz pytanie" : "Edytuj pytanie"}
                      backgroundColor="lightPurple"
                      fontColor="white"
                    />
                  </div>
                </div>
              </>
            :
              <p>Nie ma pytania o podanym numerze ID, albo nie masz do niego dostępu.</p>
          :
            <LoadingModal/>
        }
      </form>
    </TemplateContentCard>
  );
};

export default withRouter(AddNewQuestionForm);