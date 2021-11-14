import {useEffect, useState} from "react";

// interfaces
import {ITestsToShow} from "./student-tests-list.types";

const useStudentTestsList = () => {
  const [isActiveTestsView, setIsActiveTestsView] = useState<boolean>(true);
  const [testsToShow, setTestsToShow] = useState<ITestsToShow[]>([]);
  const [areTestsLoading, setAreTestsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load active tests
    setTestsToShow([]);
    setAreTestsLoading(true);
    if (isActiveTestsView) {
      let tempData: ITestsToShow[] = [
        {
          id: "1",
          name: "test1",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "2",
          name: "test2",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "3",
          name: "test3",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "4",
          name: "test4",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "5",
          name: "test5",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "6",
          name: "test6",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        },
        {
          id: "7",
          name: "test7",
          author: "Maciej Harbuz",
          startDate: "07.13.2021 13:00",
          endDate: "07.13.2021 15:00",
          time: "00h 30min"
        }
      ];

      setTestsToShow(tempData);
      // TO DO - load tests from backend API
      setAreTestsLoading(false);
    }
    // Load completed tests
    else {

      // TO DO - load tests from backend API
      setAreTestsLoading(false);
    }
  },[isActiveTestsView]);


  return {isActiveTestsView, setIsActiveTestsView, testsToShow, areTestsLoading};
};

export default useStudentTestsList;