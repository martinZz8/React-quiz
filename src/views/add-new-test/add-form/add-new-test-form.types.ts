export interface INewTestInput {//Min time: 1min, Max time: 2h
  name: string;
  numberOfQuestions: string;
  questionsIds: number[];
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;
  usersIds: number[];
  startDate: string;
  endDate: string;
}

export interface INewTestInputErrors {
  name: string;
  numberOfQuestions: string;
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;
  startDate: string;
  endDate: string;
  APIError: string;
  zeroQuestionsIds: string;
  tooBigNumberOfQuestions: string;
  badTime: string;
  badDate: string;
}