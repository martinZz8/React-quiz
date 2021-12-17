import {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import isUserType from "../../../functions/is-user-type";

// data
import {initialValidateErrors} from "./rate-test-form.data";

// interfaces
import {IQuestion, IStudent, IStudentAnswers, IAwardedPointsToStudent, IAwardedAnswer, IValidateErrors} from "./rate-test-form.types";
import {IQuestionTypes} from "../../../types/question.types";

const useRateTestForm = (testId: string) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [studentsAnswers, setStudentsAnswers] = useState<IStudentAnswers[]>([]);
  const [awardedPointsToStudents, setAwardedPointsToStudents] = useState<IAwardedPointsToStudent[]>([]);
  const [areAnswersLoading, setAreAnswersLoading] = useState<boolean>(false);
  const [hasTeacherAccess, setHasTeacherAccess] = useState<boolean>(true);
  const [actualStudentIndex, setActualStudentIndex] = useState<number>(0);
  const [validateErrors, setValidateErrors] = useState<IValidateErrors>(initialValidateErrors);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);
  const [isSendingAnswers, setIsSendingAnswers] = useState<boolean>(false);
  const [areAnswersSendProperly, setAreAnswersSendProperly] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("questions", questions);
  // },[questions]);

  // useEffect(() => {
  //   console.log("students", students);
  // },[students]);

  // useEffect(() => {
  //   console.log("studentsAnswers", studentsAnswers);
  // },[studentsAnswers]);

  // useEffect(() => {
  //   console.log("awardedPointsToStudents", awardedPointsToStudents);
  // },[awardedPointsToStudents]);

  // useEffect(() => {
  //   console.log("validateErrors", validateErrors);
  // },[validateErrors]);

  // Load questions, students and answers from backend API
  useEffect(() => {
    setAreAnswersLoading(true);

    // Load teacher's questions
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/teacher`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        let dataOne = await response.json();
        setQuestions(dataOne.content.map((question: any) => ({
          id: question.id,
          question: question.text,
          maxPoints: question.points,
          type: question.type,
          testsName: question.testsName,
          answers: question.answers.map((answer: any) => ({
            id: answer.id,
            answer: answer.text,
            correct: answer.correct
          }))
        })));

        // Load students
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(async response => {
          if (response.ok) {
            let dataTwo = await response.json();
            let students = dataTwo.content.filter((user: any) => isUserType("student", user.roles.map((role: any) => role.role)));
            setStudents(students.map((student: any) => ({
              id: student.id,
              email: student.email,
              username: student.username,
              firstName: student.firstname,
              lastName: student.lastname
            })));

            // Load student's answers for this test
            fetch(`${process.env.REACT_APP_BACKED_URL}/api/results/${testId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .then(async response => {
              if (response.ok) {
                let dataThree = await response.json();

                // Check if test is not rated yet
                let canAccess = true;

                for (let student of dataThree) {
                  if (student.answers.length === 0) {
                    canAccess = false;
                    break;
                  }
                }

                if (canAccess) {
                  // Setting student answers
                  setStudentsAnswers(dataThree.map((student: any) => ({
                    studentId: student.studentId,
                    answers: student.answers.map((answer: any) => {
                      let answerType: IQuestionTypes = "SINGLE";
                      let foundAnswer = dataOne.content.find((question: any) => question.id === answer.questionId);

                      if (foundAnswer) {
                        answerType = foundAnswer.type;
                      }

                      return {
                        id: answer.id,
                        questionId: answer.questionId,
                        selectedClosedAnswersIds: answerType !== "DESCRIPTIVE" ? answer.selectedClosedAnswersIds : null,
                        writtenOpenedAnswer: answerType === "DESCRIPTIVE" ? answer.writtenOpenedAnswers : null,
                        type: answerType
                      };
                    })
                  })));

                  // Setting initial awarded points
                  setAwardedPointsToStudents(dataThree.map((student: any) => ({
                    studentId: student.studentId,
                    answers: student.answers.map((answer: any) => ({
                      questionId: answer.questionId,
                      awardedPoints: ""
                    }))
                  })));
                }
                else {
                  setHasTeacherAccess(false);
                }

                setAreAnswersLoading(false);
              }
              else {
                setHasTeacherAccess(false);
                setAreAnswersLoading(false);
                console.log("error during answers download");
              }
            })
            .catch(error => {
              setHasTeacherAccess(false);
              setAreAnswersLoading(false);
              console.log("error during answers download");
            });
          }
          else {
            setHasTeacherAccess(false);
            setAreAnswersLoading(false);
            console.log("error during users download");
          }
        })
        .catch(error => {
          setHasTeacherAccess(false);
          setAreAnswersLoading(false);
          console.log("error during users download");
        });
      }
      else {
        setHasTeacherAccess(false);
        setAreAnswersLoading(false);
        console.log("error during questions download");
      }
    })
    .catch(error => {
      setHasTeacherAccess(false);
      setAreAnswersLoading(false);
      console.log("error during questions download");
    });
  },[]);

  // Live validation
  useEffect(() => {
    if (isLiveValidation) {
      validatePoints();
    }
  },[isLiveValidation, awardedPointsToStudents]);

  const getActualStudent = (): IStudent | undefined => {
    return students.find(student => student.id === awardedPointsToStudents[actualStudentIndex].studentId);
  };

  const handleStudentAnswerRate = (studentId: number, questionId: number, awardedPoints: string) => {
    if (awardedPoints.length < 3) {
      let foundStudentIndex = awardedPointsToStudents.findIndex(award => award.studentId === studentId);

      if (foundStudentIndex !== -1) {
        let foundAnswerIndex = awardedPointsToStudents[foundStudentIndex].answers.findIndex(answer => answer.questionId === questionId);

        if (foundAnswerIndex !== -1) {
          let copySelectedAnswer: IAwardedAnswer = {...awardedPointsToStudents[foundStudentIndex].answers[foundAnswerIndex]};
          copySelectedAnswer.awardedPoints = awardedPoints;

          setAwardedPointsToStudents(prev => [
            ...prev.slice(0, foundStudentIndex),
            {
              ...prev[foundStudentIndex],
              answers: [
                ...prev[foundStudentIndex].answers.slice(0, foundAnswerIndex),
                copySelectedAnswer,
                ...prev[foundStudentIndex].answers.slice(foundAnswerIndex+1, prev[foundStudentIndex].answers.length)
              ]
            },
            ...prev.slice(foundStudentIndex+1, prev.length)
          ]);
        }
      }
    }
  };

  const handleActualStudent = (action: "prev" | "next") => {
    if (action === "prev") {
      if (actualStudentIndex > 0) {
        setActualStudentIndex(prev => prev-1);
      }
    }
    else if (action === "next") {
      if (actualStudentIndex < awardedPointsToStudents.length-1) {
        setActualStudentIndex(prev => prev+1);
      }
    }
  };

  const validatePoints = (): boolean => {
    let retData = true;

    // Validate inputs format values (if are numbers in str)
    let messageOne = "";

    for (let student of awardedPointsToStudents) {
      let canBreakOne = false;

      for (let answer of student.answers) {
        let awardedPoints = answer.awardedPoints;

        if (awardedPoints.length === 0) {
          retData = false;
          messageOne = "Nieprawidłowy format wpisanych punktów";
          canBreakOne = true;
          break;
        }

        for (let letter of awardedPoints) {
          if (isNaN(parseInt(letter))) {
            retData = false;
            messageOne = "Nieprawidłowy format wpisanych punktów";
            canBreakOne = true;
            break;
          }
        }

        if (canBreakOne) {
          break;
        }
      }

      if (canBreakOne) {
        break;
      }
    }

    setValidateErrors(prev => ({
      ...prev,
      points: messageOne
    }));

    // Validate if points are not above the maximum
    let messageTwo = "";

    for (let student of awardedPointsToStudents) {
      let canBreakTwo = false;

      for (let answer of student.answers) {
        let foundQuestionIndex = questions.findIndex(question => question.id === answer.questionId);

        if (foundQuestionIndex !== -1) {
          let parsedPoints = parseInt(answer.awardedPoints);

          if (!isNaN(parsedPoints)) {
            if (parsedPoints > questions[foundQuestionIndex].maxPoints) {
              retData = false;
              messageTwo = "Zbyt duża wartość wpisanych punktów";
              canBreakTwo = true;
              break;
            }
          }
        }
      }

      if (canBreakTwo) {
        break;
      }
    }

    setValidateErrors(prev => ({
      ...prev,
      aboveMaxPoints: messageTwo
    }));

    return retData;
  };

  const submitAnswersRating = () => {
    setIsLiveValidation(true);
    let canSubmit = true;

    // Validate inputs
    if (!validatePoints()) {
      canSubmit = false;
    }

    if (canSubmit) {
      // Submitting ratings to the test
      setIsSendingAnswers(true);
      fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${testId}/rate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          testId: testId,
          points: awardedPointsToStudents.map(student => ({
            studentId: student.studentId,
            answers: student.answers.map(answer => ({
              questionId: answer.questionId,
              awardedPoints: parseInt(answer.awardedPoints)
            }))
          }))
        })
      })
        .then(async response => {
          if (response.ok) {
            setIsSendingAnswers(false);
            setAreAnswersSendProperly(true);
          }
          else {
            setIsSendingAnswers(false);
            console.log("error during sending ratings");
          }
        })
        .catch(error => {
          setIsSendingAnswers(false);
          console.log("error during sending ratings");
        });

    }
  };

  return {
    questions,
    students,
    studentsAnswers,
    awardedPointsToStudents,
    handleStudentAnswerRate,
    areAnswersLoading,
    hasTeacherAccess,
    actualStudentIndex,
    handleActualStudent,
    submitAnswersRating,
    validateErrors,
    getActualStudent,
    isSendingAnswers,
    areAnswersSendProperly
  };
};

export default useRateTestForm;