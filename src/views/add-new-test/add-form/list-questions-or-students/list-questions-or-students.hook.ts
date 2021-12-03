import {useState, useEffect} from "react";

// interfaces
import {IQuestion, IStudent} from "./list-questions-or-students.types";

const useListQuestionsOrStudents = (areQuestions: boolean) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (areQuestions) {
      // Get questions that belongs to teacher

    }
    else {
      // Get all users and then filter in search for students

    }
  },[]);

  return {questions, students, isLoading};
};

export default useListQuestionsOrStudents;