const formatTestDate = (strTime: string): string => {
  let splittedTime = strTime.split("T");
  if (splittedTime.length > 1) {
    let inversedDateStr = splittedTime[0].split("-").reverse().join(".");
    let timeArr = splittedTime[1].split(":");
    let timeStr = "";

    if (timeArr.length > 1) {
      timeStr = timeArr.slice(0, timeArr.length-1).join(":");
    }

    return `${inversedDateStr} ${timeStr}`;
  }

  return "";
};

export default formatTestDate;