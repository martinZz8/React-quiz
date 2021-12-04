// Convert time format from "YYYY-MM-DD'T'HH:MM" to "YYYY-MM-DD'T'HH:MM:SS.SS"
const convertBackendApiFromDatetime = (datetime: string): string => {
  return datetime+":00.00";
};

export default convertBackendApiFromDatetime;