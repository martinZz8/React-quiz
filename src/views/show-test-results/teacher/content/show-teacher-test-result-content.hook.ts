import {useState, useEffect} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// functions
import formatTestDate from "../../../../functions/format-test-date";
import isUserType from "../../../../functions/is-user-type";

// interfaces
import {IStudentData} from "./show-teacher-test-result-content.types";
import {IResult} from "../../student/content/show-student-test-result.types";

const useShowTeacherTestResultContent = (testId :string) => {
  const [students, setStudents] = useState<IStudentData[]>([]);
  const [resultsArray, setResultsArray] = useState<IResult[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState<boolean>(false);
  const [isAccessForbidden, setIsAccessForbidden] = useState<boolean>(false);
  const [activeStudentIndex, setActiveStudentIndex] = useState<number>(0);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("students:", students);
  // },[students]);

  // useEffect(() => {
  //   console.log("resultsArray:", resultsArray);
  // },[resultsArray]);

  // Download users list and results for that test
  useEffect(() => {
    setAreResultsLoading(true);

    // Download students
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        let dataOne = await response.json();

        // Filtering for students
        let studentsFromFetch = dataOne.content.filter((user: any) => isUserType("student", user.roles.map((role: any) => role.role)));

        // Setting students
        setStudents(studentsFromFetch.map((student: any) => ({
          id: student.id,
          email: student.email,
          firstName: student.firstname,
          lastName: student.lastname,
          userName: student.username
        })));

        // Download results for that test
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/results/${testId}/rated`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(async response => {
          if (response.ok) {
            let dataTwo = await response.json();

            // Setting data of the test results
            setResultsArray(dataTwo.map((singleResult: any) => ({
              id: singleResult.id,
              name: singleResult.name.split(" ").slice(0, -1).join(" "),
              dateOfExecution: formatTestDate(singleResult.dateOfExecution),
              maxPoints: singleResult.maxPoints,
              totalPoints: singleResult.totalPoints,
              userId: singleResult.userId,
              answers: singleResult.answers.map((answer: any, index: number) => ({
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
            })));

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
        });
      }
      else {
        setIsAccessForbidden(true);
        setAreResultsLoading(false);
        console.log("error during users download");
      }
    })
    .catch(error => {
      setIsAccessForbidden(true);
      setAreResultsLoading(false);
      console.log("error during users download");
    });
  },[]);

  const changeToNextPage = () => {
    if (activeStudentIndex < resultsArray.length-1) {
      setActiveStudentIndex(prev => prev+1);
    }
  };

  const changeToPrevPage = () => {
    if (activeStudentIndex > 0) {
      setActiveStudentIndex(prev => prev-1);
    }
  };

  const generateCSVFile = () => {

  };

  const generatePDFFile = () => {

  };

  const generateDOCXFile = () => {

  };

  return {
    resultsArray,
    students,
    areResultsLoading,
    isAccessForbidden,
    activeStudentIndex,
    changeToNextPage,
    changeToPrevPage,
    generateCSVFile,
    generatePDFFile,
    generateDOCXFile
  };
};

export default useShowTeacherTestResultContent;