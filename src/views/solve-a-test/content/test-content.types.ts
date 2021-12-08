import {IQuestionTypes} from "../../../types/question.types";

interface IAnswer {
  id: number;
  answer: string;
}

export interface ITestQuestion {
  id: number;
  points: number;
  testsName: string[];
  question: string;
  type: IQuestionTypes;
  answers: IAnswer[];
}

export interface ITestData {
  id: number;
  name: string;
  organizer: string;
  timeInMilliseconds: number;
  startDate: string;
  endDate: string;
  numberOfQuestions: number;
  questionPoolSize: number;
  executionSize: number;
  questionsId: number[];
  usersId: number[];
  availableUsersSize: number;
}

export interface IStudentsQuestionAnswer {
  questionId: number;
  openAnswer: string | null;
  selectedAnswerId: number | null;
  selectedAnswerIds: number[] | null;
  questionType: IQuestionTypes;
}