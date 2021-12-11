import React from "react";

// styles
import styles from "./rate-test-form.module.scss";

// hooks
import useRateTestForm from "./rate-test-form.hook";

// templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// components
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import RateTestFormNavigation from "./navigation/rate-test-form-navigation.component";
import RateTestFormHeader from "./header/rate-test-form-header.component";
import RateTestFormAnswer from "./answer/rate-test-form-answer.component";

const RateTestForm: React.FC = () => {
  const {
    questions,
    studentsAnswers,
    awardedPointsToStudents,
    areAnswersLoading,
    hasTeacherAccess,
    actualStudentIndex,
    validateErrors,
    handleActualStudent,
    handleStudentAnswerRate,
    submitAnswersRating,
    getActualStudent
  } = useRateTestForm();

  return (
    <TemplateContentCard
      title={<p>Oceń test</p>}
    >
      <div className={styles.rateTestForm}>
        {
          !areAnswersLoading ?
            hasTeacherAccess ?
              <>
                <div className={styles.headerWrap}>
                  <RateTestFormHeader
                    actualStudent={getActualStudent()}
                  />
                </div>
                <div className={`customScrollBar ${styles.questionContainer}`}>
                  {
                    studentsAnswers.length > 0 ?
                      studentsAnswers[actualStudentIndex].answers.map((answer, index) =>
                        <div
                          className={styles.answerWrap}
                          key={answer.id}
                        >
                          <RateTestFormAnswer
                            ordinalNumber={index+1}
                            question={questions.find(question => question.id === answer.questionId)}
                            studentAnswer={answer}
                            ratingValue={awardedPointsToStudents[actualStudentIndex].answers[index].awardedPoints}
                            handleRatingChange={(value: string) => handleStudentAnswerRate(studentsAnswers[actualStudentIndex].studentId, answer.questionId, value)}
                          />
                        </div>
                      )
                    :
                      null
                  }
                </div>
                <div className={styles.navigationWrap}>
                  <RateTestFormNavigation
                    isPrevButtonVisible={actualStudentIndex > 0}
                    isNextButtonVisible={actualStudentIndex < awardedPointsToStudents.length-1}
                    handlePrevButtonClick={() => handleActualStudent("prev")}
                    handleNextButtonClick={() => handleActualStudent("next")}
                    handleSubmitClick={submitAnswersRating}
                    actualPage={actualStudentIndex+1}
                    maxPage={awardedPointsToStudents.length}
                    isSubmitError={validateErrors.points !== "" || validateErrors.aboveMaxPoints !== ""}
                    errorMessage={validateErrors.points !== "" ? validateErrors.points : validateErrors.aboveMaxPoints !== "" ? validateErrors.aboveMaxPoints : ""}
                  />
                </div>
              </>
            :
              <div className={styles.noAccess}>
                <p>
                  Nie ma odpowiedzi do testu o podanym numerze ID albo nie masz do niego dostępu.
                </p>
              </div>
          :
            <LoadingModal/>
        }
      </div>
    </TemplateContentCard>
  );
};

export default RateTestForm;