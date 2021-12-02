// interfaces
import {IQuestionTypes} from "../../../types/question.types";

export interface IQuestionTypeOption {
  value: IQuestionTypes;
  textToShow: string;
}

export interface ISearchBarInputs {
  question: string;
  type: string;
}

export interface IAnswer {
  id: number;
  answer: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  points: number;
  type: string;
  testsName: string[];
  answers: IAnswer[];
}