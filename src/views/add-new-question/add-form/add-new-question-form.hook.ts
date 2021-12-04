import React, {useState, useEffect} from "react";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// data
import {initialNewQuestionInput, initialNewAnswerInput, initialNewQuestionInputsErrors} from "./add-new-question-form.data";

// interfaces
import {INewQuestionInput, INewAnswerInput, INewQuestionInputErrors} from "./add-new-question-form.types";
import {IQuestionAnswer} from "../../../types/question.types";

const useAddNewQuestionForm = (questionId: string, isQuestionEdit?: boolean) => {
  const [newQuestionInput, setNewQuestionInput] = useState<INewQuestionInput>(initialNewQuestionInput);
  const [newAnswerInput, setNewAnswerInput] = useState<INewAnswerInput>(initialNewAnswerInput);
  const [openedEditAnswersIds, setOpenedEditAnswersIds] = useState<number[]>([]);
  const [newQuestionInputErrors, setNewQuestionInputErrors] = useState<INewQuestionInputErrors>(initialNewQuestionInputsErrors);
  const [isSuccessCreation, setIsSuccessCreation] = useState<boolean>(false);
  const [isLiveValidation, setIsLiveValidation] = useState<boolean>(false);

  // States for question editing
  const [isQuestionForEditLoading, setIsQuestionForEditLoading] = useState<boolean>(false);
  const [isQuestionForEditForbidden, setIsQuestionForEditForbidden] = useState<boolean>(false);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("newQuestionInput", newQuestionInput);
  // },[newQuestionInput]);

  // Load question if it's question edit view
  useEffect(() => {
    if (isQuestionEdit) {
      setIsQuestionForEditLoading(true);
      fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions/${questionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      })
        .then(async response => {
          if (response.ok) {
            let data = await response.json();
            setNewQuestionInput({
              question: data.text,
              points: data.points,
              type: data.type,
              answers: data.answers.map((answer: any, index: number) => ({
                id: index+1,
                correct: answer.correct,
                answer: answer.text
              }))
            });
            setIsQuestionForEditLoading(false);
          }
          else {
            setIsQuestionForEditForbidden(true);
            setIsQuestionForEditLoading(false);
          }
        })
        .catch(error => {
          setIsQuestionForEditForbidden(true);
          setIsQuestionForEditLoading(false);
        });
    }
  },[]);

  // Live validation
  useEffect(() => {
    if (isLiveValidation) {
      validateQuestionText();
      validatePoints();
      validateType();
      validateAnswers();

      // setNewQuestionInputErrors(prev => ({
      //   ...prev,
      //   APIError: ""
      // }));
      //
      // setIsSuccessCreation(false);
    }
  },[isLiveValidation, newQuestionInput]);

  // hide APIError and success messages, when user changes any input
  useEffect(() => {
    if (isLiveValidation) {
      setNewQuestionInputErrors(prev => ({
        ...prev,
        APIError: ""
      }));

      setIsSuccessCreation(false);
    }
  },[newQuestionInput]);

  const findHighestAnswerId = (): number => {
    let highestId = 1;
    for (let answer of newQuestionInput.answers) {
      if (answer.id > highestId) {
        highestId = answer.id;
      }
    }

    return highestId;
  };

  const handleNewQuestionInput = (name: string, value: string) => {
    let valToSet = value;
    if (name === "points") {
      let dotIndex = valToSet.indexOf(".");
      if (dotIndex !== -1) {
        valToSet = valToSet.substring(0, dotIndex);
      }
    }

    setNewQuestionInput(prev => ({
      ...prev,
      [name]: valToSet
    }));
  };

  const handleNewAnswerInput = (name: string, value: string) => {
    setNewAnswerInput({
      answer: value
    });
  };

  const handleCorrectAnswerChange = (answerId: number, value: boolean) => {
    let foundIndex = newQuestionInput.answers.findIndex(answer => answer.id === answerId);

    if (foundIndex !== -1) {
      if (newQuestionInput.type === "SINGLE") {
        if (value) {
          let foundPrevCorrectAnswer = newQuestionInput.answers.findIndex(answer => answer.correct);
          let shallowAnswers: IQuestionAnswer[] = JSON.parse(JSON.stringify(newQuestionInput.answers));

          if (foundPrevCorrectAnswer !== -1) {
            shallowAnswers[foundPrevCorrectAnswer].correct = false;
          }

          shallowAnswers[foundIndex].correct = true;
          setNewQuestionInput(prev => ({
            ...prev,
            answers: shallowAnswers
          }));
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
      else if (newQuestionInput.type === "MULTI") {
        let isCorrect = false;
        if (value) {
          isCorrect = true;
        }

        setNewQuestionInput(prev => ({
          ...prev,
          answers: [
            ...prev.answers.slice(0, foundIndex),
            {
              ...prev.answers[foundIndex],
              correct: isCorrect
            },
            ...prev.answers.slice(foundIndex+1, prev.answers.length)
          ]
        }));
      }
    }
  };

  // Reset the answers when changes the type of answer
  const resetAnswers = () => {
    setNewQuestionInput(prev => ({
      ...prev,
      answers: []
    }));
  };

  const addAnswer = () => {
    setNewQuestionInput(prev => ({
      ...prev,
      answers: [
        ...prev.answers,
        {
          id: findHighestAnswerId()+1,
          answer: newAnswerInput.answer,
          correct: false
        }
      ]
    }));

    setNewAnswerInput({
      answer: ""
    });
  };

  const removeAnswer = (id: number) => {
    let foundIndex = newQuestionInput.answers.findIndex(answer => answer.id === id);

    if (foundIndex !== -1) {
      let copyAnswers = [...newQuestionInput.answers];
      copyAnswers.splice(foundIndex, 1);
      setNewQuestionInput(prev => ({
        ...prev,
        answers: copyAnswers
      }));

      // Remove id in openedEditAnswersIds
      let foundIndexOfOpenedEditAnswersIds = openedEditAnswersIds.findIndex(itemId => itemId === id);
      if (foundIndexOfOpenedEditAnswersIds !== -1) {
        let copyOpenedEditAnswersIds = [...openedEditAnswersIds];
        copyOpenedEditAnswersIds.splice(foundIndexOfOpenedEditAnswersIds, 1);
        setOpenedEditAnswersIds(copyOpenedEditAnswersIds);
      }
    }
  };

  const editAnswer = (id: number, value: string) => {
    let foundIndex = newQuestionInput.answers.findIndex(answer => answer.id === id);

    if (foundIndex !== -1) {
      setNewQuestionInput(prev => ({
        ...prev,
        answers: [
          ...prev.answers.slice(0, foundIndex),
          {
            ...prev.answers[foundIndex],
            answer: value
          },
          ...prev.answers.slice(foundIndex+1, prev.answers.length)
        ]
      }));
    }
  };

  const toggleOpenedAnswersIds = (id: number) => {
    let foundIdx = openedEditAnswersIds.findIndex(itemId => itemId === id);

    if (foundIdx === -1) {
      setOpenedEditAnswersIds(prev => [
        ...prev,
        id
      ]);
    }
    else {
      let copyIds = [...openedEditAnswersIds];
      copyIds.splice(foundIdx, 1);
      setOpenedEditAnswersIds(copyIds);
    }
  };

  // Validate functions
  const validateQuestionText = (): boolean => {
    let errorMessage = "";
    let retValue = true;

    if (newQuestionInput.question === "") {
      errorMessage = "Pytanie nie może być puste";
      retValue = false;
    }
    else if (newQuestionInput.question.length > 300) {
      errorMessage = "Pytanie jest za długie (zawiera więcej niż 300 znaków)";
      retValue = false;
    }

    setNewQuestionInputErrors(prev => ({
      ...prev,
      question: errorMessage
    }));
    return retValue;
  };

  const validatePoints = (): boolean => {
    let errorMessage = "";
    let retValue = true;

    if (isNaN(parseInt(newQuestionInput.points))) {
      errorMessage = "Zły format liczby punktów"
      retValue = false;
    }
    else if (parseInt(newQuestionInput.points) <= 0) {
      errorMessage = "Liczba punktów musi być większa od 0"
      retValue = false;
    }

    setNewQuestionInputErrors(prev => ({
      ...prev,
      points: errorMessage
    }));

    return retValue;
  };

  const validateType = (): boolean => {
    let errorMessage = "";
    let retValue = true;

    if (newQuestionInput.type === "") {
      errorMessage = "Typ pytania nie może być pusty";
      retValue = false;
    }

    setNewQuestionInputErrors(prev => ({
      ...prev,
      type: errorMessage
    }));

    return retValue;
  };

  const validateAnswers = (): boolean => {
    let errorMessage = "";
    let retValue = true;

    if (newQuestionInput.type !== "" && newQuestionInput.type !== "DESCRIPTIVE") {
      // SINGLE or MULTI question type
      if (newQuestionInput.answers.length < 2) {
        errorMessage = "Pytanie musi zawierać co najmniej 2 odpowiedzi";
        retValue = false;
      }
      else if (newQuestionInput.answers.filter(answer => answer.correct).length === 0) {
        errorMessage = "Nie ma zaznaczonej poprawnej odpowiedzi";
        retValue = false;
      }
      else if (newQuestionInput.answers.filter(answer => answer.answer.length === 0).length !== 0) {
        errorMessage = "Żadna odpowiedź nie może być pusta";
        retValue = false;
      }
      else if (newQuestionInput.answers.filter(answer => answer.answer.length > 300).length !== 0) {
        errorMessage = "Żadno pytanie nie może być dłuższe niż 300 znaków";
        retValue = false;
      }
    }

    setNewQuestionInputErrors(prev => ({
      ...prev,
      answers: errorMessage
    }));
    return retValue;
  };

  // Submit new question function
  const submitNewQuestionForm = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLiveValidation(true);

    // Validate the inputs
    let canSubmit = true;

    if (!validateQuestionText() || !validatePoints() || !validateType() || !validateAnswers()) {
      canSubmit = false;
    }

    if (canSubmit) {
      fetch(`${process.env.REACT_APP_BACKED_URL}/api/questions${isQuestionEdit ? `/${questionId}` : ""}`, {
        method: !isQuestionEdit ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          points: parseInt(newQuestionInput.points),
          text: newQuestionInput.question,
          type: newQuestionInput.type,
          answers: newQuestionInput.answers.map(answer => ({
            text: answer.answer,
            correct: answer.correct
          }))
        })
      })
      .then(response => {
        if (response.ok) {
          setNewQuestionInputErrors(initialNewQuestionInputsErrors);
          setIsSuccessCreation(true);
        }
        else {
          setNewQuestionInputErrors(prev => ({
            ...prev,
            APIError: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
          }));
        }
      })
      .catch(error => {
        setNewQuestionInputErrors(prev => ({
          ...prev,
          APIError: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
        }));
      });
    }
  };

  return {
    newQuestionInput,
    handleNewQuestionInput,
    newAnswerInput,
    handleNewAnswerInput,
    handleCorrectAnswerChange,
    submitNewQuestionForm,
    addAnswer,
    removeAnswer,
    editAnswer,
    openedEditAnswersIds,
    toggleOpenedAnswersIds,
    newQuestionInputErrors,
    isSuccessCreation,
    resetAnswers,
    isQuestionForEditLoading,
    isQuestionForEditForbidden
  };
};

export default useAddNewQuestionForm;