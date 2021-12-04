import {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// interfaces
import {IQuestion, IStudent} from "./list-questions-or-students.types";
import isUserType from "../../../../functions/is-user-type";

const useListQuestionsOrStudents = (areQuestions: boolean, toggleChosenIds: (id: number, isAdd: boolean) => void, isTestForEditLoaded: boolean, chosenIds: number[]) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); //was false
  const [availableIds, setAvailableIds] = useState<number[]>([]);
  const [isFetchPerformed, setIsFetchPerformed] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // Load questions or students
  useEffect(() => {
    if (isTestForEditLoaded && !isFetchPerformed) {
      setIsFetchPerformed(true);
      if (areQuestions) {
        // Get questions that belongs to teacher
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/teacher`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        .then(async response => {
          if (response.ok) {
            // Set questions
            let data = await response.json();
            setQuestions(data.content.map((question: any) => ({
              id: question.id,
              question: question.text,
              type: question.type,
              answers: question.answers.map((answer: any) => ({
                id: answer.id,
                answer: answer.text,
                correct: answer.correct
              }))
            })));

            // Set available ids
            setAvailableIds(
              data.content.map((question: any) => question.id)
                .filter((id: number) => !chosenIds.includes(id))
            );

            setIsLoading(false);
          }
          else {
            setIsLoading(false);
            console.log("error during questions download");
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log("error during questions download");
        });
      }
      else {
        // Get all users and then filter in search for students
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        .then(async response => {
          if (response.ok) {
            let data = await response.json();
            // Filter for students
            let filteredStudents = data.content.filter((user: any) =>
              isUserType("student", user.roles.map((role: any) => role.role))
            );

            // Set students
            setStudents(filteredStudents.map((student: any) => ({
              id: student.id,
              email: student.email,
              username: student.username,
              firstName: student.firstname,
              lastName: student.lastname,
            })));

            // Set available ids
            setAvailableIds(
              filteredStudents.map((user: any) => user.id)
                .filter((id: number) => !chosenIds.includes(id))
            );

            setIsLoading(false);
          }
          else {
            setIsLoading(false);
            console.log("error during users download");
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log("error during users download");
        });
      }
    }
  },[isTestForEditLoaded]);

  const toggleAvailableIds = (id: number, isAdd: boolean) => {
    let foundIdx = availableIds.findIndex(itemId => itemId === id);

    if (isAdd) {
      toggleChosenIds(id, false);
      if (foundIdx === -1) {
        setAvailableIds(prev => [
          ...prev,
          id
        ])
      }
    }
    else {
      toggleChosenIds(id, true);
      if (foundIdx !== -1) {
        let copyArr = [...availableIds];
        copyArr.splice(foundIdx, 1);
        setAvailableIds(copyArr);
      }
    }
  };

  return {questions, students, isLoading, availableIds, toggleAvailableIds};
};

export default useListQuestionsOrStudents;