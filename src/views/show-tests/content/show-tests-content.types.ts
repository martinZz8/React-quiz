// interfaces
import {ITestStatuses} from "../../../types/test.types";

export interface ITest {
  id: number;
  name: string;
  organizer: string;
  numberOfQuestions: number;
  startDate: string;
  endDate: string;
  timeInMilliseconds: number;
  questionPoolSize: number;
  questionsId: number[];
  usersId: number[];
  executionSize: number;
  availableUsersSize: number;
  status: ITestStatuses;
}

export interface IStudent {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ISearchBarInputs {
  testName: string;
  status: ITestStatuses;
}

export interface ITestStatusOption {
  value: ITestStatuses;
  textToShow: string;
}