import {useState} from "react";

const useShowQuestionsList = () => {
  const [openedQuestionsIds, setOpenedQuestionsIds] = useState<number[]>([]);

  const toggleOpenedQuestionsIds = (id: number) => {
    let foundIndex = openedQuestionsIds.findIndex(itemId => itemId === id);

    if (foundIndex === -1) {
      setOpenedQuestionsIds(prev => [
        ...prev,
        id
      ]);
    }
    else {
      let copyOpenedQuestionsIds = [...openedQuestionsIds];
      copyOpenedQuestionsIds.splice(foundIndex, 1);
      setOpenedQuestionsIds(copyOpenedQuestionsIds);
    }
  };

  return {openedQuestionsIds, toggleOpenedQuestionsIds};
};

export default useShowQuestionsList;