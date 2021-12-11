import {useState} from "react";

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

  return {
    openedTestsIds,
    toggleOpenedTestsIds
  };
};

export default useShowTestsList;