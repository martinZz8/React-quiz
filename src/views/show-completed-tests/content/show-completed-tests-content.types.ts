export type ICompletedTestStatus = "" | "TO_RATE" | "RATED"

export interface ITestToRate {
  id: number;
  name: string;
  status: ICompletedTestStatus;
  availableUsersSize: number;
  organizer: string;
  startDate: string;
  endDate: string;
  timeInMilliseconds: number;
  executionSize: number;
  numberOfQuestions: number;
  questionPoolSize: number;
  questionsId: number[];
  usersId: number[];
}

export interface ISearchBarInputs {
  testName: string;
  testStatus: ICompletedTestStatus;
}

export interface ITestStatusOption {
  value: ICompletedTestStatus;
  textToShow: string;
}