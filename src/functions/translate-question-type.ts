const translateQuestionType = (type: string): string => {
  if (type === "SINGLE") {
    return "Jednokrotny wybór";
  }
  else if (type === "MULTI") {
    return "Wielokrotny wybór";
  }
  else if (type === "DESCRIPTIVE") {
    return "Otwarte";
  }

  return "-";
};

export default translateQuestionType;