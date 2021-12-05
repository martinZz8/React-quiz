// interfaces
import {IQuestionTypes} from "../../../../types/question.types";

interface IAnswer {
  id: number;
  answer: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  points: number;
  type: IQuestionTypes;
  answers: IAnswer[];
}

export interface IStudent {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}