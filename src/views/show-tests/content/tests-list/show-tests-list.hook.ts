import {useState} from "react";

// interfaces
import {IQuestion} from "../../../show-questions/content/show-qeustions-content.types";

const useShowTestsList = () => {
  const [openedTestsIds, setOpenedTestsIds] = useState<number[]>([]);

  const toggleOpenedTestsIds = (id: number): void => {
    let foundIndex = openedTestsIds.findIndex(itemId => itemId === id);

    if (foundIndex === -1) {
      setOpenedTestsIds(prev => [
        ...prev,
        id
      ]);
    }
    else {
      let copyOpenedTestsIds = [...openedTestsIds];
      copyOpenedTestsIds.splice(foundIndex, 1);
      setOpenedTestsIds(copyOpenedTestsIds);
    }
  };

  const calculateMaxPoints = (questionsToCountBy: IQuestion[]): number => {
    return questionsToCountBy.map(question => question.points)
      .reduce((sum, val) => sum + val);
  };

  return {
    openedTestsIds,
    toggleOpenedTestsIds,
    calculateMaxPoints
  };
};

export default useShowTestsList;