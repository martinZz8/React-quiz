import React, {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// data
import {initialISearchBarInputs} from "./show-questions-content.data";

// interfaces
import {ISearchBarInputs, IQuestion} from "./show-qeustions-content.types";

const useShowQuestionsContent = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<IQuestion[]>([]);
  const [searchBarInputs, setSearchBarInputs] = useState<ISearchBarInputs>(initialISearchBarInputs);
  const [areQuestionsLoading, setAreQuestionsLoading] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // Download teacher's questions
  useEffect(() => {
    setAreQuestionsLoading(true);

    fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/teacher`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
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

        setAreQuestionsLoading(false);
      }
      else {
        setAreQuestionsLoading(false);
        console.log("error during questions download");
      }
    })
    .catch(error => {
      setAreQuestionsLoading(false);
      console.log("error during questions download");
    });
  },[]);

  // Filter questions
  useEffect(() => {
    if (questions.length > 0) {
      let filteredQuestionsToSet: IQuestion[] = questions;

      // Filter by question text
      if (searchBarInputs.question !== "") {
        filteredQuestionsToSet = filteredQuestionsToSet.filter(question =>
          question.question.toLowerCase().includes(searchBarInputs.question.toLowerCase())
        );
      }

      // Filter by type
      if (searchBarInputs.type !== "") {
        filteredQuestionsToSet = filteredQuestionsToSet.filter(question =>
          question.type.localeCompare(searchBarInputs.type) === 0
        );
      }

      // Set filtered questions
      setFilteredQuestions(filteredQuestionsToSet);
    }
  },[questions, searchBarInputs]);

  const handleSearchBarInputs = (name: string, value: string) => {
    setSearchBarInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {filteredQuestions, searchBarInputs, areQuestionsLoading, handleSearchBarInputs};
};

export default useShowQuestionsContent;