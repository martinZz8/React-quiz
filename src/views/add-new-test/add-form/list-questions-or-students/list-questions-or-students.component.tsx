import React from "react";

// styles
import styles from "./list-questions-or-students.module.scss";

// hooks
import useListQuestionsOrStudents from "./list-questions-or-students.hook";

// components
import OneList from "./one-list/one-list.component";

// interfaces
interface IListQuestionsOrStudents {
  areQuestions: boolean;
  toggleChosenIds: (id: number, isAdd: boolean) => void;
  chosenIds: number[];
}

const ListQuestionsOrStudents: React.FC<IListQuestionsOrStudents> = ({areQuestions, toggleChosenIds, chosenIds}) => {
  const {questions, students, isLoading, availableIds, toggleAvailableIds} = useListQuestionsOrStudents(areQuestions, toggleChosenIds);

  return (
    <div className={styles.listQuestionsOrStudents}>
      <div className={styles.header}>
        <p>{areQuestions ? "Wybierz pytania" : "Wybierz studentów"}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.leftContainer}>
          {
            areQuestions ?
              <OneList
                isLoading={isLoading}
                isAvailableView
                questionsToShow={questions.filter(question => availableIds.includes(question.id))}
                toggleAvailableIds={id => toggleAvailableIds(id, false)}
              />
            :
              <OneList
                isLoading={isLoading}
                isAvailableView
                studentsToShow={students.filter(student => availableIds.includes(student.id))}
                toggleAvailableIds={id => toggleAvailableIds(id, false)}
              />
          }
        </div>
        <div className={styles.rightContainer}>
          {
            areQuestions ?
              <OneList
                isLoading={false}
                questionsToShow={questions.filter(question => chosenIds.includes(question.id))}
                toggleAvailableIds={id => toggleAvailableIds(id, true)}
              />
            :
              <OneList
                isLoading={false}
                studentsToShow={students.filter(student => chosenIds.includes(student.id))}
                toggleAvailableIds={id => toggleAvailableIds(id, true)}
              />
          }
        </div>
      </div>
    </div>
  );
};

export default ListQuestionsOrStudents;