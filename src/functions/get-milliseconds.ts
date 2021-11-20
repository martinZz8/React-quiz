// interfaces
import {ITime} from "../types/time.types";

const getMilliseconds = (time: ITime): number => {
  let timeInMilliseconds: ITime = {
    seconds: 0,
    minutes: 0,
    hours: 0
  };

  timeInMilliseconds.hours = time.hours * 60 * 60 * 1000;
  timeInMilliseconds.minutes = time.minutes * 60 * 1000;
  timeInMilliseconds.seconds = time.seconds * 1000;

  return timeInMilliseconds.seconds + timeInMilliseconds.minutes + timeInMilliseconds.hours;
};

export default getMilliseconds;