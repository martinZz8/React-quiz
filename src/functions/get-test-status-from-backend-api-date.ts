// functions
import convertDatetimeFromBackendApi from "./convert-datetime-from-backend-api";
import convertJsDateFromDatetime from "./convert-js-date-from-datetime";

// interfaces
import {ITestStatuses} from "../types/test.types";

const getTestStatusFromBackendApiDate = (startDateFromBackendApi: string, endDateFromBackendApi: string): ITestStatuses => {
  let startDate: Date = convertJsDateFromDatetime(convertDatetimeFromBackendApi(startDateFromBackendApi));
  let endDate: Date = convertJsDateFromDatetime(convertDatetimeFromBackendApi(endDateFromBackendApi));
  let actualDate = new Date();

  if (actualDate < startDate) {
    return "ACTIVE_IN_FUTURE";
  }
  else if ((actualDate >= startDate) && (actualDate <= endDate)) {
    return "ACTIVE";
  }
  else {
    return "ENDED";
  }
};

export default getTestStatusFromBackendApiDate