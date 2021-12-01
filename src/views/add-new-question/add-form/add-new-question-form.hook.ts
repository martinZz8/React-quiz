import React, {useState, useEffect} from "react";

// data
import {initialNewQuestionInputs, initialNewAnswerInput} from "./add-new-question.data";

// interfaces
import {INewQuestionInput, INewAnswerInput} from "./add-new-question.types";
import {IQuestionAnswer} from "../../../types/question.types";

const useAddNewQuestionForm = () => {
  const [newQuestionInput, setNewQuestionInput] = useState<INewQuestionInput>(initialNewQuestionInputs);
  const [newAnswerInput, setNewAnswerInput] = useState<INewAnswerInput>(initialNewAnswerInput)

  useEffect(() => {
    console.log("newQuestionInput", newQuestionInput);
  },[newQuestionInput]);

  const handleNewQuestionInput = (name: string, value: string | number) => {
    setNewQuestionInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnswerChange = (name: string, value: string) => {
    setNewAnswerInput({
      answer: value
    });
  };

  const handleCorrectAnswerChange = (answerId: number, value: boolean) => {
    let foundIndex = newQuestionInput.answers.findIndex(answer => answer.id === answerId);

    if (foundIndex !== -1) {
      if (value) {
        let foundPrevCorrectAnswer = newQuestionInput.answers.findIndex(answer => answer.correct);

        if (foundPrevCorrectAnswer !== -1) {
          let shallowAnswers: IQuestionAnswer[] = JSON.parse(JSON.stringify(newQuestionInput.answers));
          shallowAnswers[foundPrevCorrectAnswer].correct = false;
          shallowAnswers[foundIndex].correct = true;

          setNewQuestionInput(prev => ({
            ...prev,
            answers: shallowAnswers
          }));
        }
      }
      else {
        setNewQuestionInput(prev => ({
          ...prev,
          answers: [
            ...prev.answers.slice(0, foundIndex),
            {
              ...prev.answers[foundIndex],
              correct: false
            },
            ...prev.answers.slice(foundIndex+1, prev.answers.length)
          ]
        }));
      }
    }
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();


  };

  return {newQuestionInput, handleNewQuestionInput, newAnswerInput, handleAnswerChange, handleCorrectAnswerChange, submitForm};
};

export default useAddNewQuestionForm;