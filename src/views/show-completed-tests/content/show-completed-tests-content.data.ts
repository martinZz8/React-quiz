// interfaces
import {ISearchBarInputs, ITestStatusOption} from "./show-completed-tests-content.types";

export const initialSearchBarInputs: ISearchBarInputs = {
  testName: "",
  testStatus: ""
}

export const selectTestStatusOptions: ITestStatusOption[] = [
  {
    value: "",
    textToShow: "Wszystkie"
  },
  {
    value: "TO_RATE",
    textToShow: "Do oceny"
  },
  {
    value: "RATED",
    textToShow: "Ocenione"
  },
  {
    value: "COMPLETED_WITHOUT_EXECUTIONS",
    textToShow: "Skończone bez wykonań"
  }
];