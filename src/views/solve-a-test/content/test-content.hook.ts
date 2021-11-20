import {useState, useEffect} from "react";

// hooks
import useCounter from "../../../hooks/useCounter";

// interfaces
import {ITestQuestion} from "./test.content.types";

const useTestContent = (testId: string) => {
  const [testQuestions, setTestQuestions] = useState<ITestQuestion[]>([]);
  const [areTestQuestionsLoading, setAreTestQuestionsLoading] = useState<boolean>(false);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isTestSubmittedManually, setIsTestSubmittedManually] = useState<boolean>(false);
  const {timeLeft, startTheTimer, endTheTimer} = useCounter();

  // -- Receive the questions from backend API --
  useEffect(() => {
    setAreTestQuestionsLoading(true);
    setTestQuestions([{
      id: "1"
    }]); // to be deleted, after fetch is performed

    // TO DO - setTestQuestions by using testId - make fetch to backend API
    setAreTestQuestionsLoading(false);
  },[]);

  // -- Submit test automatically --
  useEffect(() => {
    // Submit the test, when time runs out and test wasn't submitted manually
    if (timeLeft === 0 && !isTestSubmittedManually) {
      submitTest();
    }
  },[timeLeft]);

  // -- Start the test --
  const startTheTest = () => {
    setIsTestStarted(true);

    // TO DO - change the setted time to the proper
    startTheTimer({
      seconds: 5,
      minutes: 0,
      hours: 0
    }); // start the timer of 1 min
  };

  // -- Submit test by manual way --
  const submitTestManually = () => {
    setIsTestSubmittedManually(true);
    endTheTimer();
    submitTest();
  };

  // -- Send the answers of the test to the backend API --
  const submitTest = () => {
    console.log("Submitting the test");
    // TO DO - submit test
  };

  return {testQuestions, areTestQuestionsLoading, isTestStarted, startTheTest, timeLeft, isTestSubmittedManually, submitTestManually};
};

export default useTestContent;