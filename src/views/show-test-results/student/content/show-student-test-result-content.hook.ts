import {useState, useEffect} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// functions
import formatTestDate from "../../../../functions/format-test-date";

// data
import {initialResult} from "./show-student-test-result.data";

// interfaces
import {IResult} from "./show-student-test-result.types";

const useShowStudentTestResultContent = (resultId :string) => {
  const [results, setResults] = useState<IResult>(initialResult);
  const [areResultsLoading, setAreResultsLoading] = useState<boolean>(false);
  const [isAccessForbidden, setIsAccessForbidden] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  useEffect(() => {
    console.log("results:", results);
  },[results]);

  // Download results for that test of logged user
  useEffect(() => {
    setAreResultsLoading(true);

    fetch(`${process.env.REACT_APP_BACKED_URL}/api/results/${resultId}/one`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        let data = await response.json();

        if (typeof(data.idd) !== undefined) {
          setResults({
            id: data.id,
            name: data.name.split(" ").slice(0, -1).join(" "),
            dateOfExecution: formatTestDate(data.dateOfExecution),
            maxPoints: data.maxPoints,
            totalPoints: data.totalPoints,
            userId: data.userId,
            answers: data.answers.map((answer: any, index: number) => ({
              id: index+1,
              questionText: answer.questionText,
              questionType: answer.questionType,
              questionPoints: answer.questionPoints,
              answerRatedPoints: answer.answerRatedPoints,
              descriptiveAnswerText: answer.descriptiveAnswerText,
              correctAnswers: answer.correctAnswers.map((correctAnswer: any) => ({
                id: correctAnswer.id,
                answer: correctAnswer.text,
                correct: correctAnswer.correct
              })),
              userAnswers: answer.userAnswers.map((userAnswers: any) => ({
                id: userAnswers.id,
                answer: userAnswers.text,
                correct: userAnswers.correct
              }))
            }))
          });
        }
        else {
          setIsAccessForbidden(true);
        }

        setAreResultsLoading(false);
      }
      else {
        setIsAccessForbidden(true);
        setAreResultsLoading(false);
        console.log("error during results download");
      }
    })
    .catch(error => {
      setIsAccessForbidden(true);
      setAreResultsLoading(false);
      console.log("error during results download");
    })
  },[]);

  return {
    results,
    areResultsLoading,
    isAccessForbidden
  };
};

export default useShowStudentTestResultContent;