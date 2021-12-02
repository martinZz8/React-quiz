// interfaces
import {INewQuestionInput, ISelectQuestionData, INewAnswerInput, INewQuestionInputErrors} from "./add-new-question.types";

export const initialNewQuestionInputs: INewQuestionInput = {
  points: "0",
  question: "",
  type: "",
  answers: []
};

export const initialNewQuestionInputsErrors: INewQuestionInputErrors = {
  points: "",
  question: "",
  type: "",
  answers: "",
  APIError: ""
};

export const initialNewAnswerInput: INewAnswerInput = {
  answer: ""
};

export const selectQuestionTypeOptions: ISelectQuestionData[] = [
  {
    value: "SINGLE",
    textToShow: "Jednokrotnego wyboru"
  },
  {
    value: "MULTI",
    textToShow: "Wielokrotnego wyboru"
  },
  {
    value: "DESCRIPTIVE",
    textToShow: "Otwarte"
  }
];