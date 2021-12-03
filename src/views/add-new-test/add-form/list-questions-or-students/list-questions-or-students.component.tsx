import React from "react";

// styles
import styles from "./list-questions-or-students.module.scss";

// hooks
import useListQuestionsOrStudents from "./list-questions-or-students.hook";

// interfaces
interface IListQuestionsOrStudents {
  areQuestions: boolean;
}

const ListQuestionsOrStudents: React.FC<IListQuestionsOrStudents> = ({areQuestions}) => {
  const {questions, students, isLoading} = useListQuestionsOrStudents(areQuestions);

  return (
    <div className={styles.listQuestionsOrStudents}>

    </div>
  );
};

export default ListQuestionsOrStudents;