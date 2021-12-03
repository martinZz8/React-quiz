// interfaces
import {INewTestInput, INewTestInputErrors} from "./add-new-test-form.types";

export const initialNewTestInput: INewTestInput = {
  name: "",
  numberOfQuestions: "0",
  questionsIds: [],
  timeHours: "0",
  timeMinutes: "0",
  timeSeconds: "0",
  usersIds: [],
  startDate: "",
  endDate: ""
};

export const initialNewTestInputErrors: INewTestInputErrors = {
  name: "",
  numberOfQuestions: "",
  timeHours: "",
  timeMinutes: "",
  timeSeconds: "",
  startDate: "",
  endDate: "",
  APIError: "",
  zeroQuestionsIds: "",
  tooBigNumberOfQuestions: "",
  badTime: "",
  badDate: ""
}