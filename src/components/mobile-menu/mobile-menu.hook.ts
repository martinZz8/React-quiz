import {useState} from "react";

// data
import {initialSubmenusOpen} from "./mobile-menu.data";

// interfaces
import {ISubmenusOpen} from "./mobile-menu.types";

const useMobileMenu = () => {
  const [submenusOpen, setSubmenusOpen] = useState<ISubmenusOpen>(initialSubmenusOpen);

  const handleSubmenuToggle = (name: string) => {
    setSubmenusOpen(prev => ({
      ...prev,
      // @ts-ignore
      [name]: !prev[name]
    }));
  };

  return {submenusOpen, handleSubmenuChange: handleSubmenuToggle};
};

export default useMobileMenu;