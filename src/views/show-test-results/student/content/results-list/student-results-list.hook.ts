import {useState} from "react";

// interfaces
import {IResultSingleAnswer} from "../show-student-test-result.types";

const useStudentResultsList = () => {

  const checkIfStudentCheckedThatAnswer = (userAnswers: IResultSingleAnswer[], correctAnswer: IResultSingleAnswer): boolean => {
    let userAnswersIds = userAnswers.map(answer => answer.id);

    if (userAnswersIds.includes(correctAnswer.id)) {
      return true;
    }

    return false;
  };

  return {checkIfStudentCheckedThatAnswer};
};

export default useStudentResultsList;