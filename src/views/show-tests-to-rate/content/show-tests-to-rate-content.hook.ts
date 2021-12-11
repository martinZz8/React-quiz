import {useState, useEffect} from "react";

// data
import {initialSearchBarInputs} from "./show-tests-to-rate-content.data";

// interfaces
import {ITestToRate, ISearchBarInputs} from "./show-tests-to-rate-content.types";

const useShowTestsToRateContent = () => {
  const [tests, setTests] = useState<ITestToRate[]>([]);
  const [filteredTests, setFilteredTests] = useState<ITestToRate[]>([]);
  const [searchBarInputs, setSearchBarInputs] = useState<ISearchBarInputs>(initialSearchBarInputs);
  const [areTestsLoading, setAreTestsLoading] = useState<boolean>(false);

  // Download tests that has to be rated by teacher
  useEffect(() => {
    setAreTestsLoading(true);
    // TEMP DATA - TO BE DELETED
    setTests([
      {
        id: 1,
        name: "Test 1"
      },
      {
        id: 2,
        name: "Test 2"
      }
    ]);

    // TO DO - perform fetch here!
    setAreTestsLoading(false); // at the end of fetch

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