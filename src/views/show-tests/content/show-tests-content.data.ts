// interfaces
import {ISearchBarInputs, ITestStatusOption} from "./show-tests-content.types";

export const initialSearchBarInputs:ISearchBarInputs = {
  testName: "",
  status: ""
}

export const selectTestStatusOptions: ITestStatusOption[] = [
  {
    value: "",
    textToShow: "Wszystkie"
  },
  {
    value: "ENDED",
    textToShow: "Zakończone"
  },
  {
    value: "ACTIVE",
    textToShow: "Aktywne"
  },
  {
    value: "ACTIVE_IN_FUTURE",
    textToShow: "Aktywne w przyszłości"
  }
];

