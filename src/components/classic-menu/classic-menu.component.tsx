import React from "react";
import {NavLink} from "react-router-dom";

// styles
import styles from "./classic-menu.module.scss";

// interfaces
interface IClassicMenu {
  isStudent: boolean;
  isTeacher: boolean;
}

const ClassicMenu: React.FC<IClassicMenu> = ({isStudent, isTeacher}) => {

  return (
    <div className={styles.classicMenu}>
      <div className={styles.mainLink}>
        <NavLink
          exact
          to="/"
          activeClassName={styles.activeLink}
        >
          Strona główna
        </NavLink>
      </div>
      {
        isTeacher ?
          <>
            <div className={styles.mainLink}>
              <NavLink
                exact
                to="/pytania"
                activeClassName={styles.activeLink}
              >
                Pytania
              </NavLink>
              <div className={styles.rolledMenu}>
                <div className={styles.item}>
                  <NavLink
                    exact
                    to="/pytania"
                    activeClassName={styles.activeLink}
                  >
                    Moje pytania
                  </NavLink>
                </div>
                <div className={styles.item}>
                  <NavLink
                    exact
                    to="/pytania/dodaj"
                    activeClassName={styles.activeLink}
                  >
                    Utwórz pytanie
                  </NavLink>
                </div>
              </div>
            </div>
            <div className={styles.mainLink}>
              <NavLink
                exact
                to="/testy"
                activeClassName={styles.activeLink}
              >
                Testy
              </NavLink>
              <div className={styles.rolledMenu}>
                <div className={styles.item}>
                  <NavLink
                    exact
                    to="/testy"
                    activeClassName={styles.activeLink}
                  >
                    Moje testy
                  </NavLink>
                </div>
                <div className={styles.item}>
                  <NavLink
                    exact
                    to="/testy/dodaj"
                    activeClassName={styles.activeLink}
                  >
                    Utwórz test
                  </NavLink>
                </div>
                <div className={styles.item}>
                  <NavLink
                    exact
                    to="/testy/ocen"
                    activeClassName={styles.activeLink}
                  >
                    Testy do oceny
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        :
          null
      }
    </div>
  );
};

export default ClassicMenu;