// interfaces
import {ITime} from "../types/time.types";

const addLeadingZeroStr = (str: string, num: number): string => {
  if (num < 10) {
    return str + "0";
  }

  return str;
};

// Format the time object to string: ...XXh XXmin XXsek
const formatTimeToString = (time: ITime): string => {
  let strTime = "";

  // Hours
  strTime = addLeadingZeroStr(strTime, time.hours);
  strTime += time.hours.toString() + "h ";
  // Minutes
  strTime = addLeadingZeroStr(strTime, time.minutes);
  strTime += time.minutes.toString() + "min ";
  // Seconds
  strTime = addLeadingZeroStr(strTime, time.seconds);
  strTime += time.seconds.toString() + "sek";

  return strTime;
};

export default formatTimeToString;