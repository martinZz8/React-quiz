// interfaces

import {ITime} from "../types/time.types";

const getTimeObject = (timeInMilliseconds: number): ITime => {
  let timeObj: ITime = {
    seconds: 0,
    minutes: 0,
    hours: 0
  };

  if (timeInMilliseconds > 0) {
    timeObj.hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
    timeObj.minutes = Math.floor((timeInMilliseconds / 1000 / 60) % 60);
    timeObj.seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  }

  return timeObj;
}

export default getTimeObject;