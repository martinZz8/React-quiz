import React, {useRef} from "react";
import {NavLink} from "react-router-dom";

// styles
import styles from "./user-menu.module.scss";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// hooks
import {useActions} from "../../../hooks/useActions";
import useUserMenu from "./user-menu.hook";
import useOnClickOutside from "../../../hooks/useOnClickOutside.hook";

const UserMenu: React.FC = () => {
  const {isModalOpen, setIsModalOpen, toggleIsModalOpen, isMobileMenuOpen} = useUserMenu();
  const {logoutUser} = useActions();
  const {accessToken, user: {email, firstName, lastName, id: userId}} = useTypedSelector(state => state.login.loginData);
  const refModal = useRef<HTMLDivElement>(null);
  useOnClickOutside(refModal, () => setIsModalOpen(false));

  return (
    <div
      ref={refModal}
      className={styles.userMenu}
    >
      <div className={styles.linksContainer}>
        <NavLink
          exact
          to="/"
          activeClassName={styles.activeLink}
        >
          Strona główna
        </NavLink>
        <div className={styles.divider}/>
        <NavLink
          exact
          to="/utworz-pytanie"
          activeClassName={styles.activeLink}
        >
          Utwórz pytanie
        </NavLink>
        <div className={styles.divider}/>
        <NavLink
          exact
          to="/utworz-test"
          activeClassName={styles.activeLink}
        >
          Utwórz test
        </NavLink>
      </div>
      <div
        className={styles.userContainer}
        onClick={toggleIsModalOpen}
      >
        <div className={styles.dot}/>
        <div className={styles.userData}>
          <p className={`noSelect ${styles.userName}`}>{firstName} {lastName}</p>
          <p className={`noSelect ${styles.userEmail}`}>{email}</p>
        </div>
      </div>
      {/*Menu modal*/}
      {
        isModalOpen ?
          <div className={styles.menuModal}>
            <p className="noSelect" onClick={() => logoutUser(userId, accessToken)}>
              Wyloguj
            </p>
          </div>
        :
          null
      }
      {/*Mobile menu*/}
      {
        isMobileMenuOpen ?
          <div className={styles.mobileMenu}>
            {/*TO DO - create mobile menu*/}
          </div>
        :
          null
      }
    </div>
  );
};

export default UserMenu;