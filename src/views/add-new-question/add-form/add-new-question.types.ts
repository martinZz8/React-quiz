// interfaces
import {IQuestionAnswer, IQuestionTypes} from "../../../types/question.types";

export interface INewQuestionInput {
  points: number;
  question: string;
  type: IQuestionTypes;
  answers: IQuestionAnswer[];
}

export interface ISelectQuestionData {
  value: IQuestionTypes;
  textToShow: string;
}

export interface INewAnswerInput {
  answer: string;
}