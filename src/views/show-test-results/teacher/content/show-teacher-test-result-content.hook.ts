import {useState, useEffect} from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// jsPDF
import '../../../../assets/fonts/PTSans-normal';
import { jsPDF } from "jspdf";

// functions
import formatTestDate from "../../../../functions/format-test-date";
import isUserType from "../../../../functions/is-user-type";
import translateQuestionType from "../../../../functions/translate-question-type";

// interfaces
import {IStudentData} from "./show-teacher-test-result-content.types";
import {IResult} from "../../student/content/show-student-test-result.types";

const useShowTeacherTestResultContent = (testId :string) => {
  const [students, setStudents] = useState<IStudentData[]>([]);
  const [resultsArray, setResultsArray] = useState<IResult[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState<boolean>(false);
  const [isAccessForbidden, setIsAccessForbidden] = useState<boolean>(false);
  const [activeStudentIndex, setActiveStudentIndex] = useState<number>(0);

  const accessToken = useTypedSelector(state => state.login.loginData.accessToken);

  // useEffect(() => {
  //   console.log("students:", students);
  // },[students]);

  // useEffect(() => {
  //   console.log("resultsArray:", resultsArray);
  // },[resultsArray]);

  // Download users list and results for that test
  useEffect(() => {
    setAreResultsLoading(true);

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
        let dataOne = await response.json();

        // Filtering for students
        let studentsFromFetch = dataOne.content.filter((user: any) => isUserType("student", user.roles.map((role: any) => role.role)));

        // Setting students
        setStudents(studentsFromFetch.map((student: any) => ({
          id: student.id,
          email: student.email,
          firstName: student.firstname,
          lastName: student.lastname,
          userName: student.username
        })));

        // Download results for that test
        fetch(`${process.env.REACT_APP_BACKED_URL}/api/results/${testId}/rated`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(async response => {
          if (response.ok) {
            let dataTwo = await response.json();

            // Setting data of the test results
            setResultsArray(dataTwo.map((singleResult: any) => ({
              id: singleResult.id,
              name: singleResult.name.split(" ").slice(0, -1).join(" "),
              dateOfExecution: formatTestDate(singleResult.dateOfExecution),
              maxPoints: singleResult.maxPoints,
              totalPoints: singleResult.totalPoints,
              userId: singleResult.userId,
              answers: singleResult.answers.map((answer: any, index: number) => ({
                id: index+1,
                questionText: answer.questionText,
                questionType: answer.questionType,
                questionPoints: answer.questionPoints,
                answerRatedPoints: answer.answerRatedPoints,
                descriptiveAnswerText: answer.descriptiveAnswerText,
                correctAnswers: answer.correctAnswers.map((correctAnswer: any) => ({
                  id: correctAnswer.id,
                  answer: correctAnswer.text,
                  correct: correctAnswer.correct
                })),
                userAnswers: answer.userAnswers.map((userAnswers: any) => ({
                  id: userAnswers.id,
                  answer: userAnswers.text,
                  correct: userAnswers.correct
                }))
              }))
            })));

            setAreResultsLoading(false);
          }
          else {
            setIsAccessForbidden(true);
            setAreResultsLoading(false);
            console.log("error during results download");
          }
        })
        .catch(error => {
          setIsAccessForbidden(true);
          setAreResultsLoading(false);
          console.log("error during results download");
        });
      }
      else {
        setIsAccessForbidden(true);
        setAreResultsLoading(false);
        console.log("error during users download");
      }
    })
    .catch(error => {
      setIsAccessForbidden(true);
      setAreResultsLoading(false);
      console.log("error during users download");
    });
  },[]);

  const changeToNextPage = () => {
    if (activeStudentIndex < resultsArray.length-1) {
      setActiveStudentIndex(prev => prev+1);
    }
  };

  const changeToPrevPage = () => {
    if (activeStudentIndex > 0) {
      setActiveStudentIndex(prev => prev-1);
    }
  };

  const generateCSVFile = () => {
    let testName = "";
    let separator = ";";
    let csvContent = "data:text/csv;charset=utf-8,";

    // Header of the CSV
    csvContent += "Legenda informacji ogólnych o teście\n";
    csvContent += `Lp.${separator}Imię i nazwisko ucznia${separator}Email ucznia${separator}Nazwa użytkownika ucznia${separator}Nazwa testu${separator}Data wykonania testu${separator}Maksymalna ilość punktów za test${separator}Zdobyta ilość punktów\n\n`;
    csvContent += "Legenda pytań i odpowiedzi\n";
    csvContent += `Lp.${separator}Treść pytania${separator}Typ pytania${separator}Maksymalne punkty${separator}Zdobyte punkty${separator}Prawidłowe odpowiedzi${separator}Odpowiedzi studenta${separator}Odpowiedź otwarta studenta\n\n`;

    // Adding the result for each student
    resultsArray.forEach((result, indexOne) => {
      // Setting test name to use in file name
      if (indexOne === 0) {
        testName = result.name;
      }

      // Search for the student with specified id
      let foundStudent = students.find(student => student.id === result.userId);

      // If student is found, fill the csv string with the content
      if (foundStudent) {
        csvContent += "INFORMACJE OGÓLNE\n";
        csvContent += `${(indexOne+1).toString()}${separator}${foundStudent.firstName} ${foundStudent.lastName}${separator}${foundStudent.email}${separator}${foundStudent.userName}${separator}${result.name}${separator}${result.dateOfExecution}${separator}${result.maxPoints}${separator}${result.totalPoints}\n`;
        csvContent += "PYTANIE I ODPOWIEDZI\n";

        result.answers.forEach((answer, indexTwo) => {
          csvContent += `${(indexTwo+1).toString()}${separator}${answer.questionText}${separator}${translateQuestionType(answer.questionType)}${separator}${answer.questionPoints}${separator}${answer.answerRatedPoints}${separator}${answer.questionType !== "DESCRIPTIVE" ? answer.correctAnswers.filter(correctAnswer => correctAnswer.correct).map(correctAnswer => correctAnswer.answer).join("*") : "-"}${separator}${answer.questionType !== "DESCRIPTIVE" ? answer.userAnswers.map(userAnswer => userAnswer.answer).join("*") : "-"}${separator}${answer.questionType === "DESCRIPTIVE" ? answer.descriptiveAnswerText : "-"}\n`;
        });

        csvContent += "\n";
      }
    });

    // Create the CSV file and download it
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${testName}_wyniki.csv`);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the CSV data file
  };

  const generatePDFFile = () => {
    let testName = "";

    // Variables of the document
    // A4 format in px is 595 x 842
    const maxPageWidth = 595;
    const maxPageHeight = 842;
    const pageMargin = 20;
    const headerSpacingBottom = 20;
    const normalTextSpacingBottom = 17;

    // Variables of the cursor position
    let cursorX = pageMargin;
    let cursorY = pageMargin;

    // Local function for checking if the cursor is out of the working area - if so it resets the cursor position
    const checkTheCursorPosition = () => {
      if (cursorX >= (maxPageWidth - pageMargin)) {
        cursorX = pageMargin;
      }

      if (cursorY >= (maxPageHeight - pageMargin)) {
        doc.addPage("a4", "portrait");
        cursorX = pageMargin;
        cursorY = pageMargin;
      }
    };

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });

    // Set default font
    doc.setFont("PTSans");

    // Fill the document with each student data
    resultsArray.forEach((result, indexOne) => {
      // Setting test name to use in file name
      if (indexOne === 0) {
        testName = result.name;
      }

      // Search for the student with specified id
      let foundStudent = students.find(student => student.id === result.userId);

      // If student is found, fill the pdf with the content
      if (foundStudent) {
        doc.setFontSize(16);
        doc.text(`${indexOne+1}. Informacje o teście - ${foundStudent.firstName} ${foundStudent.lastName}`, cursorX, cursorY);
        cursorY += headerSpacingBottom;

        doc.line(cursorX, cursorY, maxPageWidth-pageMargin, cursorY, "F");
        cursorY += headerSpacingBottom + 1;

        doc.setFontSize(12);
        doc.text(`Rozwiązujący uczeń: ${foundStudent.firstName} ${foundStudent.lastName}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Nazwa użytkownika ucznia: ${foundStudent.userName}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Email ucznia: ${foundStudent.email}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Nazwa testu: ${result.name}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Data wykonania: ${result.dateOfExecution}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Maksymalna ilość punktów do zdobycia: ${result.maxPoints}\n`, cursorX, cursorY);
        cursorY += normalTextSpacingBottom;

        doc.text(`Zdobyte punkty: ${result.totalPoints}\n`, cursorX, cursorY);
        cursorY += headerSpacingBottom*2;

        doc.setFontSize(16);
        doc.text("Odpowiedzi na pytania", cursorX, cursorY);
        cursorY += headerSpacingBottom;

        doc.line(cursorX, cursorY, maxPageWidth-pageMargin, cursorY, "F");
        cursorY += headerSpacingBottom + 1;

        result.answers.forEach((answer, indexTwo) => {
          checkTheCursorPosition();

          doc.setFontSize(14);
          doc.text(`${indexTwo+1}. ${answer.questionText}`, cursorX, cursorY);
          cursorY += headerSpacingBottom;
          checkTheCursorPosition();

          // Question
          doc.setFontSize(12);
          doc.text(`Typ pytania: ${translateQuestionType(answer.questionType)}`, cursorX, cursorY);
          cursorY += normalTextSpacingBottom;
          checkTheCursorPosition();

          doc.text(`Zdobyte punkty: ${answer.answerRatedPoints} / ${answer.questionPoints}`, cursorX, cursorY);
          cursorY += normalTextSpacingBottom;
          checkTheCursorPosition();

          doc.text(`Prawidłowe odpowiedzi: ${answer.questionType !== "DESCRIPTIVE" ? answer.correctAnswers.filter(correctAnswer => correctAnswer.correct).map(correctAnswer => correctAnswer.answer).join(", ") : "-"}`, cursorX, cursorY);
          cursorY += normalTextSpacingBottom*2;
          checkTheCursorPosition();

          doc.text(`Odpowiedzi studenta: ${answer.questionType !== "DESCRIPTIVE" ? answer.userAnswers.map(userAnswer => userAnswer.answer).join(", ") : "-"}`, cursorX, cursorY);
          cursorY += normalTextSpacingBottom*2;
          checkTheCursorPosition();

          doc.text(`Otwarta odpowiedź studenta: ${answer.questionType === "DESCRIPTIVE" ? answer.descriptiveAnswerText : "-"}`, cursorX, cursorY);
          cursorY += normalTextSpacingBottom*2;
          checkTheCursorPosition();

          if (indexTwo < (result.answers.length-1)) {
            doc.setDrawColor(169, 169, 169);
            doc.line(cursorX, cursorY, maxPageWidth-pageMargin, cursorY);
            cursorY += normalTextSpacingBottom + 1;
          }
        });

        // Add next page if it's not the last student
        if (indexOne !== resultsArray.length-1) {
          cursorX = pageMargin;
          cursorY = pageMargin;
          doc.addPage("a4", "portrait");
        }
      }
    });

    // Save the pdf document and download it
    doc.save(`${testName}_wyniki.pdf`);
  };

  const generateDOCXFile = () => {


  };

  return {
    resultsArray,
    students,
    areResultsLoading,
    isAccessForbidden,
    activeStudentIndex,
    changeToNextPage,
    changeToPrevPage,
    generateCSVFile,
    generatePDFFile,
    generateDOCXFile
  };
};

export default useShowTeacherTestResultContent;