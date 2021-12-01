import React from "react";
import {NavLink} from "react-router-dom";

// styles
import styles from "./mobile-menu.module.scss";

// templates
import TemplateBasicModal from "../../modals/basic-modal/basic-modal.template";

// hooks
import useMobileMenu from "./mobile-menu.hook";

// interface
interface IMobileMenu {
  onOutClick: () => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({onOutClick}) => {
  const {submenusOpen, handleSubmenuChange} = useMobileMenu();


  return (
    <TemplateBasicModal
      onOutClick={onOutClick}
    >
      <div className={`customScrollBar ${styles.mobileMenu}`}>
        <div className={styles.menuItem}>
          <NavLink
            exact
            to="/"
            activeClassName={styles.activeLink}
          >
            Strona główna
          </NavLink>
        </div>
        <div
          className={styles.menuItem}
          onClick={() => handleSubmenuChange("questions")}
        >
          <p>
            Pytania
          </p>
        </div>
        {
          submenusOpen.questions ?
            <>
              <div className={styles.menuSubItem}>
                <NavLink
                  exact
                  to="/pytania"
                  activeClassName={styles.activeLink}
                >
                  Moje pytania
                </NavLink>
              </div>
              <div className={styles.menuSubItem}>
                <NavLink
                  exact
                  to="/pytania/dodaj"
                  activeClassName={styles.activeLink}
                >
                  Utwórz pytanie
                </NavLink>
              </div>
            </>
            :
            null
        }
        <div
          className={styles.menuItem}
          onClick={() => handleSubmenuChange("tests")}
        >
          <p>
            Testy
          </p>
        </div>
        {
          submenusOpen.tests ?
            <>
              <div className={styles.menuSubItem}>
                <NavLink
                  exact
                  to="/testy"
                  activeClassName={styles.activeLink}
                >
                  Moje testy
                </NavLink>
              </div>
              <div className={styles.menuSubItem}>
                <NavLink
                  exact
                  to="/testy/dodaj"
                  activeClassName={styles.activeLink}
                >
                  Utwórz test
                </NavLink>
              </div>
            </>
            :
            null
        }
      </div>
    </TemplateBasicModal>
  );
};

export default MobileMenu;