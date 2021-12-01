// functions
import getTimeObject from "./get-time-object";

const formatTestTime = (timeInMilliseconds: number): string => {
  let timeObj = getTimeObject(timeInMilliseconds);

  return `${timeObj.hours}h ${timeObj.minutes}min`
};

export default formatTestTime;