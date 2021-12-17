import {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import isUserType from "../../../functions/is-user-type";

// data
import {initialSearchBarInputs} from "./show-completed-tests-content.data";

// interfaces
import {ITestToRate, ISearchBarInputs} from "./show-completed-tests-content.types";

const useShowTestsToRateContent = () => {
  const [tests, setTests] = useState<ITestToRate[]>([]);
  const [filteredTests, setFilteredTests] = useState<ITestToRate[]>([]);
  const [searchBarInputs, setSearchBarInputs] = useState<ISearchBarInputs>(initialSearchBarInputs);
  const [areTestsLoading, setAreTestsLoading] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("tests:", tests);
  // },[tests]);

  // Download tests that has to be rated by teacher
  useEffect(() => {
    setAreTestsLoading(true);

    // Download finished tests
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/finished`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        let data = await response.json();
        setTests(data.content.map((test: any) => ({
          id: test.id,
          name: test.name,
          status: test.executionSize > 0 ? test.status : "COMPLETED_WITHOUT_EXECUTIONS",
          availableUsersSize: test.availableUsersSize,
          organizer: test.organizer,
          startDate: test.startDate,
          endDate: test.endDate,
          timeInMilliseconds: test.time,
          executionSize: test.executionSize,
          numberOfQuestions: test.numberOfQuestions,
          questionPoolSize: test.questionPoolSize,
          questionsId: test.questionsId,
          usersId: test.usersId
        })));

        setAreTestsLoading(false);
      }
      else {
        setAreTestsLoading(false);
        console.log("error during tests download");
      }
    })
    .catch(error => {
      setAreTestsLoading(false);
      console.log("error during tests download");
    });

  },[]);

  // Filter tests
  useEffect(() => {
    if (tests.length > 0) {
      let filteredTestsToSet: ITestToRate[] = tests;

      // Filter by test name
      if (searchBarInputs.testName !== "") {
        filteredTestsToSet = filteredTestsToSet.filter(test =>
          test.name.toLowerCase().includes(searchBarInputs.testName.toLowerCase())
        );
      }

      // Filter by test status
      if (searchBarInputs.testStatus !== "") {
        filteredTestsToSet = filteredTestsToSet.filter(test =>
          test.status.localeCompare(searchBarInputs.testStatus) === 0
        );
      }

      // Set filtered tests
      setFilteredTests(filteredTestsToSet);
    }
  },[tests, searchBarInputs]);

  // Handle search bar input function
  const handleSearchBarInputs = (name: string, value: string) => {
    setSearchBarInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    filteredTests,
    searchBarInputs,
    handleSearchBarInputs,
    areTestsLoading
  };
};

export default useShowTestsToRateContent;