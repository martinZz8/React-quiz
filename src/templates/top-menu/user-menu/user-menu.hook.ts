import {useState} from "react";

const useUserMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {isModalOpen, setIsModalOpen, toggleIsModalOpen};
};

export default useUserMenu;