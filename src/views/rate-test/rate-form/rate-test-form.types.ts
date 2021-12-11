// interfaces
import {IQuestionTypes} from "../../../types/question.types";

interface IAnswer {
  id: number;
  answer: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  maxPoints: number;
  type: IQuestionTypes;
  testsName: number[];
  answers: IAnswer[];
}

export interface IStudent {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ISingleStudentAnswer {
  id: number;
  questionId: number;
  type: IQuestionTypes;
  selectedClosedAnswersIds: number[] | null;
  writtenOpenedAnswer: string | null;
}

export interface IStudentAnswers {
  studentId: number;
  answers: ISingleStudentAnswer[];
}

export interface IAwardedAnswer {
  questionId: number;
  awardedPoints: string;
}

export interface IAwardedPointsToStudent {
  studentId: number;
  answers: IAwardedAnswer[];
}

export interface IValidateErrors {
  points: string;
  aboveMaxPoints: string;
}