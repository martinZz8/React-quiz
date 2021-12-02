import {IQuestionTypeOption, ISearchBarInputs} from "./show-qeustions-content.types";

export const selectQuestionTypeOptions: IQuestionTypeOption[] = [
  {
    value: "",
    textToShow: "Wszystkie"
  },
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

export const initialISearchBarInputs: ISearchBarInputs = {
  question: "",
  type: ""
};