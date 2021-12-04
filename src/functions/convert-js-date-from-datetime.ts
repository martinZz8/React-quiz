// Convert time format from "YYYY-MM-DD'T'HH:MM" to Date object
const convertJsDateFromDatetime = (datetime: string): Date => {
  let splittedDate = datetime.split("T");

  if (splittedDate.length === 2) {
    let onlyDate = splittedDate[0].split("-");
    let onlyTime = splittedDate[1].split(":");

    if (onlyDate.length === 3 && onlyTime.length === 2) {
      // Get only date elements
      let year = parseInt(onlyDate[0]);
      let month = parseInt(onlyDate[1])-1;
      let day = parseInt(onlyDate[2]);

      // Get only time elements
      let hours = parseInt(onlyTime[0]);
      let minutes = parseInt(onlyTime[1]);

      return new Date(year, month, day, hours, minutes);
    }
  }

  return new Date();
};

export default convertJsDateFromDatetime;