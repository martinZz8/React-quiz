// interfaces
import {INewQuestionInput, ISelectQuestionData, INewAnswerInput} from "./add-new-question.types";

export const initialNewQuestionInputs: INewQuestionInput = {
  points: 0,
  question: "",
  type: "",
  answers: []
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