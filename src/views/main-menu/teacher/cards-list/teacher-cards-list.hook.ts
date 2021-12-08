import {useState} from "react";

const useTeacherCardsList = () => {
  const [isActiveQuestionCards, setIsActiveQuestionCards] = useState<boolean>(true);

  return {isActiveQuestionCards, setIsActiveQuestionCards};
};

export default useTeacherCardsList;