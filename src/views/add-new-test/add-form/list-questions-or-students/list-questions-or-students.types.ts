// interfaces
import {IQuestionTypes} from "../../../../types/question.types";

export interface IQuestion {
  question: string;
  type: IQuestionTypes;
}

export interface IStudent {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}