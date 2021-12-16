import {useState} from "react";

// interfaces
import {ICompletedTestStatus} from "../show-completed-tests-content.types";

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

  const translateTestStatus = (status: ICompletedTestStatus): string => {
    if (status === "RATED") {
      return "Ocenione";
    }
    else if (status === "TO_RATE") {
      return "Do oceny";
    }

    return "-";
  };

  return {
    openedTestsIds,
    toggleOpenedTestsIds,
    translateTestStatus
  };
};

export default useShowTestsList;