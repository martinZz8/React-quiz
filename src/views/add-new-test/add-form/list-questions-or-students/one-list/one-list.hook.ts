import {useState, useEffect} from "react";

// interfaces
import {IQuestion, IStudent} from "../list-questions-or-students.types";

const useOneList = (questionsToShow?: IQuestion[], studentsToShow?: IStudent[]) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredQuestionsToShow, setFilteredQuestionsToShow] = useState<IQuestion[]>([]);
  const [filteredStudentsToShow, setFilteredStudentsToShow] = useState<IStudent[]>([]);

  // Filter questions or students
  useEffect(() => {
    if (questionsToShow) {
      let filteredQuestionsToShowToSet = questionsToShow;

      if (searchInput !== "") {
        filteredQuestionsToShowToSet = questionsToShow.filter(question => question.question.toLowerCase().includes(searchInput.toLowerCase()));
      }

      setFilteredQuestionsToShow(filteredQuestionsToShowToSet);
    }
    else if (studentsToShow) {
      let filteredStudentsToShowToSet = studentsToShow;

      if (searchInput !== "") {
        filteredStudentsToShowToSet = studentsToShow.filter(student => student.email.toLowerCase().includes(searchInput.toLowerCase()));
      }

      setFilteredStudentsToShow(filteredStudentsToShowToSet);
    }
  },[searchInput, questionsToShow, studentsToShow]);

  const closeIfOpenedId = (id: number) => {
    let foundIdx = openedIds.findIndex(itemId => itemId === id);

    if (foundIdx !== -1) {
      let copyArr = [...openedIds];
      copyArr.splice(foundIdx, 1);
      setOpenedIds(copyArr);
    }
  };

  const toggleOpenedIds = (id: number) => {
    let foundIdx = openedIds.findIndex(itemId => itemId === id);

    if (foundIdx === -1) {
      setOpenedIds(prev => [
        ...prev,
        id
      ]);
    }
    else {
      let copyArr = [...openedIds];
      copyArr.splice(foundIdx, 1);
      setOpenedIds(copyArr);
    }
  };

  return {openedIds,
    closeIfOpenedId,
    toggleOpenedIds,
    searchInput,
    setSearchInput,
    filteredQuestionsToShow,
    filteredStudentsToShow
  };
};

export default useOneList;