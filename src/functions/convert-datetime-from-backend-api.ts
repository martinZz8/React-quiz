// Convert time format from "YYYY-MM-DD'T'HH:MM:SS.SS" to "YYYY-MM-DD'T'HH:MM"
const convertDatetimeFromBackendApi = (dateFromBackendApi: string): string => {
  let splittedDateFromBackendApi = dateFromBackendApi.split("T");
  if (splittedDateFromBackendApi.length === 2) {
    let splittedTimeFromBackendApi = splittedDateFromBackendApi[1].split(":");

    if (splittedTimeFromBackendApi.length === 3) {
      let properTimeFormat = splittedTimeFromBackendApi.slice(0, splittedTimeFromBackendApi.length-1).join(":");

      return splittedDateFromBackendApi[0]+"T"+properTimeFormat;
    }
  }

  return "";
};

export default convertDatetimeFromBackendApi;