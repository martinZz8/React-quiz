import React, {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import getTimeObject from "../../../functions/get-time-object";
import convertDatetimeFromBackendApi from "../../../functions/convert-datetime-from-backend-api";

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

  useEffect(() => {
    console.log("newTestInput:", newTestInput);
  },[newTestInput]);

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
      // TO DO - run validate functions


      setNewTestInputErrors(prev => ({
        ...prev,
        APIError: ""
      }));

      setIsSuccessCreation(false);
    }
  },[isLiveValidation, newTestInput]);

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


  // Submit new test form
  const submitNewTestForm = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLiveValidation(true);

    // Validate inputs

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