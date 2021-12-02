// interfaces
import {IQuestionAnswer, IQuestionTypes} from "../../../types/question.types";

export interface INewQuestionInput {
  points: string;
  question: string;
  type: IQuestionTypes;
  answers: IQuestionAnswer[];
}

export interface INewQuestionInputErrors {
  points: string;
  question: string;
  type: string;
  answers: string;
  APIError: string;
}

export interface ISelectQuestionData {
  value: IQuestionTypes;
  textToShow: string;
}

export interface INewAnswerInput {
  answer: string;
}