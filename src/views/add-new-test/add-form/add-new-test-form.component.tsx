import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./add-new-test-form.module.scss";

// hooks
import useAddNewTestForm from "./add-new-test-form.hook";

//templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import Button from "../../../components/ui/button/button.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import ListQuestionsOrStudents from "./list-questions-or-students/list-questions-or-students.component";

// interfaces
interface IAddNewTestForm extends RouteComponentProps<any> {
  isTestEdit?: boolean;
}

const AddNewTestForm: React.FC<IAddNewTestForm> = ({isTestEdit, match}) => {
  const {
    newTestInput,
    newTestInputErrors,
    handleTestInputChange,
    toggleQuestionOrStudent,
    submitNewTestForm,
    isSuccessCreation,
    isTestForEditLoading,
    isTestForEditForbidden,
    isTestForEditLoaded
  } = useAddNewTestForm(match.params.id, isTestEdit);

  return (
    <TemplateContentCard
      title={<p>{!isTestEdit ? "Dodaj nowy test" : "Edytuj test"}</p>}
    >
      <form
        className={`customScrollBar ${styles.addNewTestForm} ${isTestForEditForbidden ? styles.forbidden : ""}`}
        onSubmit={submitNewTestForm}
        noValidate
      >
        {
          !isTestForEditLoading ?
            !isTestForEditForbidden ?
              <>
                {/*Test inputs*/}
                <div className={styles.row}>
                  <div className={`${styles.item} ${styles.fullWidth}`}>
                    <InputField
                      type="text"
                      label="Nazwa testu"
                      placeholder="Nazwa testu"
                      name="name"
                      value={newTestInput.name}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.name !== ""}
                      errorMessage={newTestInputErrors.name}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="number"
                      label="Liczba pytań"
                      placeholder="Liczba pytań"
                      name="numberOfQuestions"
                      value={newTestInput.numberOfQuestions}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.numberOfQuestions !== ""}
                      errorMessage={newTestInputErrors.numberOfQuestions}
                    />
                  </div>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="datetime-local"
                      label="Data startu"
                      placeholder="Data startu"
                      name="startDate"
                      value={newTestInput.startDate}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.startDate !== ""}
                      errorMessage={newTestInputErrors.startDate}
                    />
                  </div>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="datetime-local"
                      label="Data końca"
                      placeholder="Data końca"
                      name="endDate"
                      value={newTestInput.endDate}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.endDate !== ""}
                      errorMessage={newTestInputErrors.endDate}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="number"
                      label="Liczba godzin"
                      placeholder="Liczba godzin"
                      name="timeHours"
                      value={newTestInput.timeHours}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.timeHours !== ""}
                      errorMessage={newTestInputErrors.timeHours}
                    />
                  </div>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="number"
                      label="Liczba minut"
                      placeholder="Liczba minut"
                      name="timeMinutes"
                      value={newTestInput.timeMinutes}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.timeMinutes !== ""}
                      errorMessage={newTestInputErrors.timeMinutes}
                    />
                  </div>
                  <div className={`${styles.item}`}>
                    <InputField
                      type="number"
                      label="Liczba sekund"
                      placeholder="Liczba sekund"
                      name="timeSeconds"
                      value={newTestInput.timeSeconds}
                      handleChange={handleTestInputChange}
                      isError={newTestInputErrors.timeSeconds !== ""}
                      errorMessage={newTestInputErrors.timeSeconds}
                    />
                  </div>
                </div>
                {/*List questions*/}
                <div className={styles.row} style={{marginTop: "10px"}}>
                  <div className={`${styles.item} ${styles.fullWidth}`}>
                    <ListQuestionsOrStudents
                      areQuestions={true}
                      toggleChosenIds={(id, isAdd) => toggleQuestionOrStudent(true, id ,isAdd)}
                      chosenIds={newTestInput.questionsIds}
                      isTestForEditLoaded={isTestForEditLoaded}
                    />
                  </div>
                </div>
                {/*List students*/}
                <div className={styles.row} style={{marginTop: "10px"}}>
                  <div className={`${styles.item} ${styles.fullWidth}`}>
                    <ListQuestionsOrStudents
                      areQuestions={false}
                      toggleChosenIds={(id, isAdd) => toggleQuestionOrStudent(false, id ,isAdd)}
                      chosenIds={newTestInput.usersIds}
                      isTestForEditLoaded={isTestForEditLoaded}
                    />
                  </div>
                </div>
                {/*Error box*/}
                <div className={styles.row}>
                  <div className={`${styles.item} ${styles.fullWidth} ${styles.messageBoxWrap}`}>
                    {
                      isSuccessCreation ||
                      newTestInputErrors.APIError !== "" ||
                      newTestInputErrors.zeroQuestionsIds !== "" ||
                      newTestInputErrors.tooBigNumberOfQuestions !== "" ||
                      newTestInputErrors.badTime !== "" ||
                      newTestInputErrors.badDate !== "" ?
                        <div className={`${styles.messageBox} ${isSuccessCreation ? styles.successMessage : styles.errorMessage}`}>
                          <p>
                            {
                              isSuccessCreation ?
                                !isTestEdit ? "Poprawnie utworzono test" : "Poprawnie edytowano test"
                              : newTestInputErrors.APIError !== "" ?
                                newTestInputErrors.APIError
                              : newTestInputErrors.zeroQuestionsIds !== "" ?
                                newTestInputErrors.zeroQuestionsIds
                              : newTestInputErrors.tooBigNumberOfQuestions !== "" ?
                                newTestInputErrors.tooBigNumberOfQuestions
                              : newTestInputErrors.badTime !== "" ?
                                newTestInputErrors.badTime
                              :
                                newTestInputErrors.badDate
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
                      title={!isTestEdit ? "Utwórz test" : "Edytuj test"}
                      backgroundColor="lightPurple"
                      fontColor="white"
                    />
                  </div>
                </div>
              </>
            :
              <p>Nie ma testu o podanym numerze ID, albo nie masz do niego dostępu.</p>
          :
            <LoadingModal/>
        }
      </form>
    </TemplateContentCard>
  );
};

export default withRouter(AddNewTestForm);