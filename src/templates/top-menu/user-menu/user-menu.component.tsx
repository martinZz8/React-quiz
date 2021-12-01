import React, {useRef} from "react";

// styles
import styles from "./user-menu.module.scss";

// SVGS
import {ReactComponent as SVGMobileMenuOpen} from "../../../assets/svg/mobile_menu_open.svg";
import {ReactComponent as SVGMobileMenuClose} from "../../../assets/svg/mobile_menu_close.svg";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// functions
import HasUserRole from "../../../functions/has-user-role";

// hooks
import {useActions} from "../../../hooks/useActions";
import useUserMenu from "./user-menu.hook";
import useOnClickOutside from "../../../hooks/useOnClickOutside.hook";

// components
import ClassicMenu from "../../../components/classic-menu/classic-menu.component";
import MobileMenu from "../../../components/mobile-menu/mobile-menu.component";


const UserMenu: React.FC = () => {
  const {isModalOpen, setIsModalOpen, toggleIsModalOpen, isMobileMenuOpen, setIsMobileMenuOpen, toggleIsMobileMenuOpen} = useUserMenu();
  const {logoutUser} = useActions();
  const {accessToken, user: {email, firstName, lastName, id: userId, roles}} = useTypedSelector(state => state.login.loginData);
  const refModal = useRef<HTMLDivElement>(null);
  useOnClickOutside(refModal, () => setIsModalOpen(false));

  return (
    <div
      className={styles.userMenu}
    >
      <div
        className={`${styles.mobileMenuIcon}`}
        onClick={toggleIsMobileMenuOpen}
      >
        {
          !isMobileMenuOpen ?
            <SVGMobileMenuOpen/>
          :
            <SVGMobileMenuClose/>
        }
      </div>
      <ClassicMenu
        isStudent={HasUserRole("student", roles)}
        isTeacher={HasUserRole("teacher", roles)}
      />
      <div
        ref={refModal}
        className={styles.userContainer}
      >
        <div
          className={styles.userDataWrapper}
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
            <div
              className={styles.menuModal}
              onClick={() => logoutUser(userId, accessToken)}
            >
              <p className="noSelect">
                Wyloguj
              </p>
            </div>
            :
            null
        }
      </div>
      {/*Mobile menu*/}
      {
        isMobileMenuOpen ?
          <MobileMenu
            onOutClick={() => setIsMobileMenuOpen(false)}
          />
        :
          null
      }
    </div>
  );
};

export default UserMenu;