const translateTestStatus = (status: string): string => {

  if (status === "ENDED") {
    return "Zakończony";
  }
  else if (status === "ACTIVE") {
    return "Aktywny";
  }
  else if (status === "ACTIVE_IN_FUTURE") {
    return "Aktywny w przyszłości";
  }

  return "-";
};

export default translateTestStatus;