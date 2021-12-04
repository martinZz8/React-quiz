import React, {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import getTimeObject from "../../../functions/get-time-object";
import convertDatetimeFromBackendApi from "../../../functions/convert-datetime-from-backend-api";
import getMilliseconds from "../../../functions/get-milliseconds";
import convertJsDateFromDatetime from "../../../functions/convert-js-date-from-datetime";
import convertBackendApiFromDatetime from "../../../functions/convert-backend-api-from-datetime";

// data
import {initialNewTestInput, initialNewTestInputErrors} from "./add-new-test-form.data";

// interfaces
import {INewTestInput, INewTestInputErrors} from "./add-new-test-form.types";
import {ITime} from "../../../types/time.types";

const useAddNewTestForm = (testId: string, isTestEdit?: boolean) => {
  const [newTestInput, setNewTestInput] = useState<INewTestInput>(initialNewTestInput);
  const [newTestInputErrors, setNewTestInputErrors] = useState<INewTestInputErrors>(initialNewTestInputErrors);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const [isSuccessCreation, setIsSuccessCreation] = useState<boolean>(false);

  // Edit test states
  const [isTestForEditLoading, setIsTestForEditLoading] = useState<boolean>(false);
  const [isTestForEditForbidden, setIsTestForEditForbidden] = useState<boolean>(false);

  const {accessToken, user: {username}} = useTypedSelector(state => state.login.loginData);

  // useEffect(() => {
  //   console.log("newTestInput:", newTestInput);
  // },[newTestInput]);

  // Load test if it's test edit view
  useEffect(() => {
    if (isTestEdit) {
      setIsTestForEditLoading(true);
      fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${testId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      })
        .then(async response => {
          if (response.ok) {
            let data = await response.json();
            if (data.organizer.split("(")[1].slice(0, -1).localeCompare(username) === 0) { //Check if actual teacher has created this test - if yes, he can update it
              let timeObject: ITime = getTimeObject(data.time);
              setNewTestInput({
                name: data.name,
                numberOfQuestions: data.numberOfQuestions,
                questionsIds: data.questionsId,
                timeHours: timeObject.hours.toString(),
                timeMinutes: timeObject.minutes.toString(),
                timeSeconds: timeObject.seconds.toString(),
                usersIds: data.usersId,
                startDate: convertDatetimeFromBackendApi(data.startDate),
                endDate: convertDatetimeFromBackendApi(data.endDate),
              });
            }
            else {
              console.log("usernames doesn't match")
              setIsTestForEditForbidden(true);
            }
            setIsTestForEditLoading(false);
          }
          else {
            setIsTestForEditForbidden(true);
            setIsTestForEditLoading(false);
          }
        })
        .catch(error => {
          setIsTestForEditForbidden(true);
          setIsTestForEditLoading(false);
        });
    }
  },[]);

  // Live validation
  useEffect(() => {
    if (isLiveValidation) {
      validateName();
      validateNumberOfQuestions();
      validateTime();
      validateDate();
    }
  },[isLiveValidation, newTestInput]);

  // hide APIError and success messages, when user changes any input
  useEffect(() => {
    if (isLiveValidation) {
      setNewTestInputErrors(prev => ({
        ...prev,
        APIError: ""
      }));

      setIsSuccessCreation(false);
    }
  },[newTestInput]);

  const handleTestInputChange = (name: string, value: string) => {
    let valToSet = value;

    if (name === "numberOfQuestions" || name === "timeHours" || name === "timeMinutes" || name === "timeSeconds") {
      let dotIndex = valToSet.indexOf(".");
      if (dotIndex !== -1) {
        valToSet = valToSet.substring(0, dotIndex);
      }
    }

    setNewTestInput(prev => ({
      ...prev,
      [name]: valToSet
    }));
  };

  const toggleQuestionOrStudent = (isForQuestions: boolean, id: number, isAdd: boolean) => {
    let arrName: "questionsIds" | "usersIds" = isForQuestions ? "questionsIds" : "usersIds";

    let foundIdx = newTestInput[arrName].findIndex(question => question === id);

    if (isAdd) {
      if (foundIdx === -1) {
        setNewTestInput(prev => ({
          ...prev,
          [arrName]: [
            ...prev[arrName],
            id
          ]
        }));
      }
    }
    else {
      if (foundIdx !== -1) {
        let copyArr = [...newTestInput[arrName]];
        copyArr.splice(foundIdx, 1);
        setNewTestInput(prev => ({
          ...prev,
          [arrName]: copyArr
        }));
      }
    }
  };

  // Validation functions
  const validateName = (): boolean => {
    let message = "";
    let retVal = true;

    if (newTestInput.name.length === 0) {
      message = "Pole nie może być puste";
      retVal = false;
    }
    else if (newTestInput.name.length > 100) {
      message = "Zbyt dużo znaków (maksymalnie 100)";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      name: message
    }));

    return retVal;
  };

  const validateNumberOfQuestions = (): boolean => {
    let retVal = true;

    // Check numberOfQuestions
    let messageNumberOfQuestions = "";

    if (isNaN(parseInt(newTestInput.numberOfQuestions))) {
      messageNumberOfQuestions = "Pole nie zawiera liczby";
      retVal = false;
    }
    else if (parseInt(newTestInput.numberOfQuestions) === 0) {
      messageNumberOfQuestions = "Nie może być 0 pytań";
      retVal = false;
    }
    else if (parseInt(newTestInput.numberOfQuestions) > 100) {
      messageNumberOfQuestions = "Zbyt dużo pytań (maksymalnie 100)";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      numberOfQuestions: messageNumberOfQuestions
    }));

    // Check numberOfQuestions with combine of questionsIds's length
    if (retVal) {
      let messageTooBigNumberOfQuestions = "";

      if (parseInt(newTestInput.numberOfQuestions) > newTestInput.questionsIds.length) {
        messageNumberOfQuestions = "Liczba pytań jest za duża";
        retVal = false;
      }

      setNewTestInputErrors(prev => ({
        ...prev,
        tooBigNumberOfQuestions: messageTooBigNumberOfQuestions
      }));
    }

    // Check questionsIds's length
    let messageZeroQuestionsIds = "";

    if (newTestInput.questionsIds.length === 0) {
      messageZeroQuestionsIds = "Nie wybrano żadnych pytań";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      zeroQuestionsIds: messageZeroQuestionsIds
    }));

    return retVal;
  };

  const validateTime = (): boolean => {
    let retVal = true;

    // Check timeHours
    let messageTimeHours = "";

    if (isNaN(parseInt(newTestInput.timeHours))) {
      messageTimeHours = "Pole nie zawiera liczby";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      timeHours: messageTimeHours
    }));

    // Check timeMinutes
    let messageTimeMinutes = "";

    if (isNaN(parseInt(newTestInput.timeMinutes))) {
      messageTimeMinutes = "Pole nie zawiera liczby";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      timeMinutes: messageTimeMinutes
    }));

    // Check timeSeconds
    let messageTimeSeconds = "";

    if (isNaN(parseInt(newTestInput.timeSeconds))) {
      messageTimeSeconds = "Pole nie zawiera liczby";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      timeSeconds: messageTimeSeconds
    }));

    // Check time if it's between 1min and 2h
    if (retVal) {
      let messageBadTime = "";

      let totalTimeInMilliseconds = getMilliseconds({
        hours: parseInt(newTestInput.timeHours),
        minutes: parseInt(newTestInput.timeMinutes),
        seconds: parseInt(newTestInput.timeSeconds)
      });

      if (totalTimeInMilliseconds < 60000) {
        messageBadTime = "Czas testu jest mniejszy niż 1 minuta";
        retVal = false;
      }
      else if (totalTimeInMilliseconds > 7200000) {
        messageBadTime = "Czas testu jest większy niż 2 godziny";
        retVal = false;
      }

      setNewTestInputErrors(prev => ({
        ...prev,
        badTime: messageBadTime
      }));
    }

    return retVal;
  };

  const validateDate = (): boolean => {
    let retVal = true;

    // Check dateStart
    let messageStartDate = "";

    if (newTestInput.startDate === "") {
      messageStartDate = "Wybierz poprawną datę startu";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      startDate: messageStartDate
    }));

    // Check endStart
    let messageEndDate = "";

    if (newTestInput.endDate === "") {
      messageEndDate = "Wybierz poprawną datę końca";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      endDate: messageEndDate
    }));

    // Check date range
    let messageBadDate = "";

    let actualDate = new Date();
    let startDate: Date = convertJsDateFromDatetime(newTestInput.startDate);
    let endDate: Date = convertJsDateFromDatetime(newTestInput.endDate);

    if (startDate < actualDate) {
      messageBadDate = "Data startu jest z przeszłości";
      retVal = false;
    }
    else if (startDate > endDate) {
      messageBadDate = "Data startu jest późniejsza niż data końca";
      retVal = false;
    }
    else if (startDate.getTime() === endDate.getTime()) {
      messageBadDate = "Data startu i data końca są takie same";
      retVal = false;
    }

    setNewTestInputErrors(prev => ({
      ...prev,
      badDate: messageBadDate
    }));

    return retVal;
  };

  // Submit new test form
  const submitNewTestForm = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLiveValidation(true);

    let canSubmit = true;
    // Validate inputs
    if (!validateName() || !validateNumberOfQuestions() || !validateTime() || !validateDate()) {
      canSubmit = false;
    }

    // Perform submit if it's possible
    if (canSubmit) {
      let requestToBeSend = {
        name: newTestInput.name,
        numberOfQuestions: newTestInput.numberOfQuestions,
        time: getMilliseconds({
          hours: parseInt(newTestInput.timeHours),
          minutes: parseInt(newTestInput.timeMinutes),
          seconds: parseInt(newTestInput.timeSeconds)
        }),
        questionsId: newTestInput.questionsIds,
        usersId: newTestInput.usersIds,
        startDate: convertBackendApiFromDatetime(newTestInput.startDate),
        endDate: convertBackendApiFromDatetime(newTestInput.endDate)
      };

      console.log("Request to be send:", requestToBeSend);

      fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests${isTestEdit ? `/${testId}` : ""}`, {
        method: !isTestEdit ? 'POST': 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestToBeSend)
      })
      .then(async response => {
        if (response.ok) {
          setNewTestInputErrors(initialNewTestInputErrors);
          setIsSuccessCreation(true);
        }
        else {
          setNewTestInputErrors(prev => ({
            ...prev,
            APIError: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
          }));
        }
      })
      .catch(error => {
        setNewTestInputErrors(prev => ({
          ...prev,
          APIError: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
        }));
      })
    }
  };

  return {
    newTestInput,
    newTestInputErrors,
    isSuccessCreation,
    handleTestInputChange,
    toggleQuestionOrStudent,
    submitNewTestForm,
    isTestForEditLoading,
    isTestForEditForbidden
  };
};

export default useAddNewTestForm;