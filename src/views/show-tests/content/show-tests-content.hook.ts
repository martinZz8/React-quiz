import {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import isUserType from "../../../functions/is-user-type";
import getTestStatusFromBackendApiDate from "../../../functions/get-test-status-from-backend-api-date";

// data
import {initialSearchBarInputs} from "./show-tests-content.data";

// interfaces
import {ITest, IStudent, ISearchBarInputs} from "./show-tests-content.types";
import {IQuestion} from "../../show-questions/content/show-qeustions-content.types";

const useShowTestsContent = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [filteredTests, setFilteredTests] = useState<ITest[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [searchBarInputs, setSearchBarInputs] = useState<ISearchBarInputs>(initialSearchBarInputs);
  const [areTestsLoading, setAreTestsLoading] = useState<boolean>(false);
  const [areTestsLoaded, setAreTestsLoaded] = useState<boolean>(false);

  // Delete modal states
  const [isDeleteTestModalOpened, setIsDeleteTestModalOpened] = useState<boolean>(false);
  const [testIdToBeDeleted ,setTestIdToBeDeleted] = useState<number>(0);
  const [isDeletingTestProcessing, setIsDeletingTestProcessing] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // Download teacher's tests and questions, then users
  useEffect(() => {
    setAreTestsLoading(true);

    // Download teacher's tests
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/created`, {
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
          organizer: test.organizer,
          numberOfQuestions: test.numberOfQuestions,
          startDate: test.startDate,
          endDate: test.endDate,
          timeInMilliseconds: test.time,
          questionPoolSize: test.questionPoolSize,
          questionsId: test.questionsId,
          usersId: test.usersId,
          executionSize: test.executionSize,
          availableUsersSize: test.availableUsersSize,
          status: getTestStatusFromBackendApiDate(test.startDate, test.endDate)
        })));

        // Download teacher's questions
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/teacher`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(async response => {
          if (response.ok) {
            let data = await response.json();
            setQuestions(data.content.map((question: any) => ({
              id: question.id,
              question: question.text,
              points: question.points,
              type: question.type,
              testsName: question.testsName,
              answers: question.answers.map((answer: any) => ({
                id: answer.id,
                answer: answer.text,
                correct: answer.correct
              }))
            })));

            // Download students
            fetch(`${process.env.REACT_APP_BACKED_URL}/api/users`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .then(async response => {
              if (response.ok) {
                let data = await response.json();
                let students = data.content.filter((user: any) => isUserType("student", user.roles.map((role: any) => role.role)));
                setStudents(students.map((student: any) => ({
                  id: student.id,
                  email: student.email,
                  username: student.username,
                  firstName: student.firstname,
                  lastName: student.lastname
                })));

                setAreTestsLoading(false);
                setAreTestsLoaded(true);
              }
              else {
                setAreTestsLoading(false);
                console.log("error during users download");
              }
            })
            .catch(error => {
              setAreTestsLoading(false);
              console.log("error during users download");
            });
          }
          else {
            setAreTestsLoading(false);
            console.log("error during questions download");
          }
        })
        .catch(error => {
          setAreTestsLoading(false);
          console.log("error during questions download");
        });
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

  // Check status of the tests every 1 minute - this interval is setted only once
  useEffect(() => {
    if (areTestsLoaded) {
      const timer = setInterval(() => {
        // console.log("I run! 2");
        setTests(tests.map(test => ({
          ...test,
          status: getTestStatusFromBackendApiDate(test.startDate, test.endDate)
        })));
      }, 2000);

      return () => clearInterval(timer);
    }
  },[areTestsLoaded]);

  // Filter tests
  useEffect(() => {
    if (tests.length > 0) {
      let filteredTestsToSet: ITest[] = tests;

      // Filter by test name
      if (searchBarInputs.testName !== "") {
        filteredTestsToSet = filteredTestsToSet.filter(test =>
          test.name.toLowerCase().includes(searchBarInputs.testName.toLowerCase())
        );
      }

      // Filter by test status
      if (searchBarInputs.status !== "") {
        filteredTestsToSet = filteredTestsToSet.filter(test =>
          test.status === searchBarInputs.status
        );
      }

      // Set filtered tests
      setFilteredTests(filteredTestsToSet);
    }
  },[tests, searchBarInputs]);

  // handle search bar inputs function
  const handleSearchBarInputs = (name: string, value: string) => {
    setSearchBarInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Delete test
  const deleteTest = () => {
    setIsDeletingTestProcessing(true);
    fetch(`${process.env.REACT_APP_BACKED_URL}/api/tests/${testIdToBeDeleted}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      if (response.ok) {
        // Delete this test locally
        let foundIndex = tests.findIndex(test => test.id === testIdToBeDeleted);
        if (foundIndex !== -1) {
          let copyTests = [...tests];
          copyTests.splice(foundIndex, 1);
          setTests(copyTests);
        }
        // Close modal
        setIsDeletingTestProcessing(false);
        setIsDeleteTestModalOpened(false);
      }
      else {
        setIsDeletingTestProcessing(false);
        setIsDeleteTestModalOpened(false);
        console.log("error during test delete");
      }
    })
    .catch(error => {
      setIsDeletingTestProcessing(false);
      setIsDeleteTestModalOpened(false);
      console.log("error during test delete");
    });
  };

  return {
    filteredTests,
    questions,
    students,
    searchBarInputs,
    handleSearchBarInputs,
    isDeleteTestModalOpened,
    setIsDeleteTestModalOpened,
    isDeletingTestProcessing,
    setTestIdToBeDeleted,
    areTestsLoading,
    deleteTest
  };
};

export default useShowTestsContent;