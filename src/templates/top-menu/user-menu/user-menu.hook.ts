import {useState, useEffect, useContext} from "react";

// context
import {WindowContext} from "../../../contexts/window-size-provider.component";

const useUserMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const {windowWidth, windowHeight} = useContext(WindowContext);

  useEffect(() => {
    if (windowWidth > 800) {
      setIsMobileMenuOpen(false);
    }
  },[windowWidth]);

  const toggleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {isModalOpen, setIsModalOpen, toggleIsModalOpen, isMobileMenuOpen};
};

export default useUserMenu;