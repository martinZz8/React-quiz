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

    fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${isActiveTestsView ? "active" : "nonactive"}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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