import {useEffect, useState} from "react";

// redux
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// functions
import formatTestDate from "../../../../functions/format-test-date";
import formatTestTime from "../../../../functions/format-test-time";

// interfaces
import {ITestsToShow} from "./student-tests-list.types";

const useStudentTestsList = () => {
  const [isActiveTestsView, setIsActiveTestsView] = useState<boolean>(true);
  const [testsToShow, setTestsToShow] = useState<ITestsToShow[]>([]);
  const [areTestsLoading, setAreTestsLoading] = useState<boolean>(false);
  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  useEffect(() => {
    // Load active tests
    setTestsToShow([]);
    setAreTestsLoading(true);

    //**OLD TEST DATA**
    // let tempData: ITestsToShow[] = [
    //   {
    //     id: "1",
    //     name: "test1",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "2",
    //     name: "test2",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "3",
    //     name: "test3",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "4",
    //     name: "test4",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "5",
    //     name: "test5",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "6",
    //     name: "test6",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   },
    //   {
    //     id: "7",
    //     name: "test7",
    //     author: "Maciej Harbuz",
    //     startDate: "07.13.2021 13:00",
    //     endDate: "07.13.2021 15:00",
    //     time: "00h 30min"
    //   }
    // ];

    fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${isActiveTestsView ? "active" : "nonactive"}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(async response => {
      if (response.ok) {
        let data = await response.json();
        setTestsToShow(data.content.map((item: any) => ({
          id: item.id,
          name: item.name,
          author: item.organizer.split("(")[0],
          startDate: formatTestDate(item.startDate),
          endDate: formatTestDate(item.endDate),
          time: formatTestTime(item.time)
        })));
      }
      else {
        console.log("error during loading");
      }
      setAreTestsLoading(false);
    })
    .catch(error => {
      setAreTestsLoading(false);
      console.log("error:", error);
    });
  },[isActiveTestsView]);


  return {isActiveTestsView, setIsActiveTestsView, testsToShow, areTestsLoading};
};

export default useStudentTestsList;