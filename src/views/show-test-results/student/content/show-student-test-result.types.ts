// interfaces
import {IQuestionTypes} from "../../../../types/question.types";

export interface IResultSingleAnswer {
  id: number;
  answer: string;
  correct: boolean;
}

interface IResultAnswer {
  id: number;
  questionText: string;
  questionType: IQuestionTypes;
  questionPoints: number;
  answerRatedPoints: number;
  descriptiveAnswerText: string | null;
  correctAnswers: IResultSingleAnswer[];
  userAnswers: IResultSingleAnswer[];
}

export interface IResult {
  id: number;
  name: string;
  dateOfExecution: string;
  maxPoints: number;
  totalPoints: number;
  userId: number;
  answers: IResultAnswer[];
}