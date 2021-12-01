import {useState, useEffect, useContext} from "react";

// context
import {WindowContext} from "../../../providers/window-size-provider.component";

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

  const toggleIsMobileMenuOpen = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return {isModalOpen, setIsModalOpen, toggleIsModalOpen, isMobileMenuOpen, setIsMobileMenuOpen, toggleIsMobileMenuOpen};
};

export default useUserMenu;