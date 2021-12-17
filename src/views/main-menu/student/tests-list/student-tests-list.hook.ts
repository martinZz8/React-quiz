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

  // useEffect(() => {
  //   console.log("testsToShow", testsToShow);
  // },[testsToShow]);

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
        let dataOne = await response.json();
        setTestsToShow(dataOne.content.map((item: any) => ({
          id: item.id,
          name: item.name,
          author: item.organizer.split("(")[0],
          startDate: formatTestDate(item.startDate),
          endDate: formatTestDate(item.endDate),
          time: formatTestTime(item.time),
          isResult: false,
          dateOfExecution: null,
          maxPoints: null,
          totalPoints: null
        })));

        if (!isActiveTestsView) {
          fetch(`${process.env.REACT_APP_BACKED_URL}/api/results`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          })
            .then(async response => {
              if (response.ok) {
                let dataTwo = await response.json();

                setTestsToShow(prev => [
                  ...prev,
                  ...dataTwo.map((result: any) => ({
                    id: result.id,
                    name: result.name.split(" ").slice(0, -1).join(" "),
                    author: null,
                    startDate: null,
                    endDate: null,
                    time: null,
                    isResult: true,
                    dateOfExecution: formatTestDate(result.dateOfExecution),
                    maxPoints: result.maxPoints,
                    totalPoints: result.totalPoints
                  }))
                ])

                setAreTestsLoading(false);
              }
              else {
                setAreTestsLoading(false);
                console.log("error during rated tests loading");
              }
            })
            .catch(error => {
              setAreTestsLoading(false);
              console.log("error during rated tests loading");
            })
        }
        else {
          setAreTestsLoading(false);
        }
      }
      else {
        setAreTestsLoading(false);
        console.log("error during finished tests loading");
      }
    })
    .catch(error => {
      setAreTestsLoading(false);
      console.log("error:", error);
    });
  },[isActiveTestsView]);


  return {isActiveTestsView, setIsActiveTestsView, testsToShow, areTestsLoading};
};

export default useStudentTestsList;