import {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// hooks
import useTimer from "../../../hooks/useTimer";

// functions
import getTimeObject from "../../../functions/get-time-object";
import convertJsDateFromDatetime from "../../../functions/convert-js-date-from-datetime";
import convertDatetimeFromBackendApi from "../../../functions/convert-datetime-from-backend-api";

// data
import {initialTestData} from "./test-content.data";

// interfaces
import {ITestQuestion, ITestData, IStudentsQuestionAnswer} from "./test-content.types";

const useTestContent = (testId: string) => {
  const [testData, setTestData] = useState<ITestData>(initialTestData);
  const [testQuestions, setTestQuestions] = useState<ITestQuestion[]>([]);
  const [studentsQuestionsAnswers, setStudentsQuestionsAnswers] = useState<IStudentsQuestionAnswer[]>([]);

  const [areTestQuestionsLoading, setAreTestQuestionsLoading] = useState<boolean>(false);
  const [isTestAccessForbidden, setIsTestAccessForbidden] = useState<boolean>(false);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isTestSubmittedManually, setIsTestSubmittedManually] = useState<boolean>(false);
  const [isSubmitModalOpened, setIsSubmitModalOpened] = useState<boolean>(false);
  const [isTestSubmitting, setIsTestSubmitting] = useState<boolean>(false);
  const [isTestStartedTooLate, setIsTestStartedTooLate] = useState<boolean>(false);
  const [isErrorTestSubmit, setIsErrorTestSubmit] = useState<boolean>(false);
  const {timeLeft, startTheTimer, endTheTimer} = useTimer();

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("testData:",testData);
  // },[testData]);

  // useEffect(() => {
  //   console.log("testQuestions:",testQuestions);
  // },[testQuestions]);

  // useEffect(() => {
  //   console.log("studentsQuestionsAnswers", studentsQuestionsAnswers);
  // },[studentsQuestionsAnswers]);

  // -- Receive the questions from backend API --
  useEffect(() => {
    setAreTestQuestionsLoading(true);

    // Download the questions for test
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/test/${testId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        let data = await response.json();
        setTestQuestions(data.map((question: any) => ({
          id: question.id,
          points: question.points,
          testsName: question.testsName,
          question: question.text,
          type: question.type,
          answers: question.answers.map((answer: any) => ({
            id: answer.id,
            answer: answer.text
          }))
        })));

        // Set students answers
        setStudentsQuestionsAnswers(data.map((question: any) => ({
          questionId: question.id,
          openAnswer: question.type === "DESCRIPTIVE" ? "" : null,
          selectedAnswerId: null,
          selectedAnswerIds: question.type === "MULTI" ? [] : null,
          questionType: question.type
        })));

        // Download other test data
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${testId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(async response => {
          if (response.ok) {
            let data = await response.json();
            setTestData({
              id: data.id,
              name: data.name,
              organizer: data.organizer,
              timeInMilliseconds: data.time,
              startDate: data.startDate,
              endDate: data.endDate,
              numberOfQuestions: data.numberOfQuestions,
              questionPoolSize: data.questionPoolSize,
              executionSize: data.executionSize,
              questionsId: data.questionsId,
              usersId: data.usersId,
              availableUsersSize: data.availableUsersSize
            });

            setAreTestQuestionsLoading(false);
          }
          else {
            setIsTestAccessForbidden(true);
            setAreTestQuestionsLoading(false);
          }
        })
        .catch(error => {
          setIsTestAccessForbidden(true);
          setAreTestQuestionsLoading(false);
        });
      }
      else {
        setIsTestAccessForbidden(true);
        setAreTestQuestionsLoading(false);
      }
    })
    .catch(error => {
      setIsTestAccessForbidden(true);
      setAreTestQuestionsLoading(false);
    });
  },[]);

  // -- Submit test automatically --
  useEffect(() => {
    // Submit the test, when time runs out and test wasn't submitted manually
    if (timeLeft === 0 && !isTestSubmittedManually) {
      submitTest();
    }
  },[timeLeft]);

  // -- Get test info time string --
  const getTestTimeInfo = (): string => {
    const timeObj = getTimeObject(testData.timeInMilliseconds);

    return `${timeObj.hours} ${timeObj.hours === 0 ? "godzin" : timeObj.hours === 1 ? "godzinę" : "godziny"}
      ${timeObj.minutes} ${timeObj.minutes === 0 || timeObj.minutes >= 5 ? "minut" : timeObj.minutes === 1 ? "minutę" : "minuty"}
      ${timeObj.seconds} ${timeObj.seconds === 0 || timeObj.seconds >= 5 ? "sekund" : timeObj.seconds === 1 ? "sekundę" : "sekundy"}`;
  };

  const handleAnswerChange = (questionId: number, answerId: number, value: boolean | string) => {
    let foundAnswerIndex = studentsQuestionsAnswers.findIndex(answer => answer.questionId === questionId);

    if (foundAnswerIndex !== -1) {
      if (studentsQuestionsAnswers[foundAnswerIndex].questionType === "SINGLE") {
        setStudentsQuestionsAnswers([
          ...studentsQuestionsAnswers.slice(0, foundAnswerIndex),
          {
            ...studentsQuestionsAnswers[foundAnswerIndex],
            selectedAnswerId: value ? answerId : null
          },
          ...studentsQuestionsAnswers.slice(foundAnswerIndex+1, studentsQuestionsAnswers.length)
        ]);
      }
      else if (studentsQuestionsAnswers[foundAnswerIndex].questionType === "MULTI") {
        // @ts-ignore
        let arrToSet: number[] = [...studentsQuestionsAnswers[foundAnswerIndex].selectedAnswerIds];

        if (value) {
          arrToSet = [
            ...arrToSet,
            answerId
          ]
        }
        else {
          let foundArrIdx = arrToSet.findIndex(item => item === answerId);
          if (foundArrIdx !== -1) {
            arrToSet.splice(foundArrIdx, 1);
          }
        }

        setStudentsQuestionsAnswers([
          ...studentsQuestionsAnswers.slice(0, foundAnswerIndex),
          {
            ...studentsQuestionsAnswers[foundAnswerIndex],
            selectedAnswerIds: arrToSet
          },
          ...studentsQuestionsAnswers.slice(foundAnswerIndex+1, studentsQuestionsAnswers.length)
        ]);
      }
      else {
        if (typeof(value) === "string") {
          let valToSet = value;
          if (valToSet.length > 300) {
            valToSet = valToSet.substring(0, 300);
          }

          setStudentsQuestionsAnswers([
            ...studentsQuestionsAnswers.slice(0, foundAnswerIndex),
            {
              ...studentsQuestionsAnswers[foundAnswerIndex],
              openAnswer: valToSet
            },
            ...studentsQuestionsAnswers.slice(foundAnswerIndex+1, studentsQuestionsAnswers.length)
          ]);
        }
      }
    }
  };

  // -- Start the test --
  const startTheTest = () => {
    let actualDate = new Date();
    let endDate: Date = convertJsDateFromDatetime(convertDatetimeFromBackendApi(testData.endDate));
    if (actualDate <= endDate) {
      setIsTestStarted(true);
      startTheTimer(testData.timeInMilliseconds);
    }
    else {
      setIsTestStartedTooLate(true);
    }
  };

  // -- Submit test by manual way --
  const submitTestManually = () => {
    setIsTestSubmittedManually(true);
    endTheTimer();
    submitTest();
  };

  // -- Send the answers of the test to the backend API --
  const submitTest = () => {
    setIsSubmitModalOpened(false);
    setIsTestSubmitting(true);

    fetch(`${process.env.REACT_APP_BACKED_URL}/api/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        testId: testData.id,
        answers: studentsQuestionsAnswers.map(answer => ({
          questionId: answer.questionId,
          text: answer.questionType === "DESCRIPTIVE" ? (answer.openAnswer?.length !== 0 && answer.openAnswer?.length !== undefined) ? answer.openAnswer : " " : null,
          answerId: answer.questionType === "SINGLE" ? answer.selectedAnswerId : null,
          answerIds: answer.questionType === "MULTI" ? answer.selectedAnswerIds : null
        }))
      })
    })
    .then(response => {
      if (response.ok) {
        // console.log("Here!!");
        setIsTestSubmitting(false);
      }
      else {
        console.log("error during test submitting");
        setIsErrorTestSubmit(true);
        setIsTestSubmitting(false);
      }
    })
    .catch(error => {
      console.log("error during test submitting");
      setIsErrorTestSubmit(true);
      setIsTestSubmitting(false);
    });
  };

  return {
    testQuestions,
    testData,
    studentsQuestionsAnswers,
    handleAnswerChange,
    areTestQuestionsLoading,
    isTestAccessForbidden,
    isTestStarted,
    startTheTest,
    timeLeft,
    isTestSubmittedManually,
    submitTestManually,
    getTestTimeInfo,
    isSubmitModalOpened,
    setIsSubmitModalOpened,
    isTestSubmitting,
    isTestStartedTooLate,
    isErrorTestSubmit
  };
};

export default useTestContent;