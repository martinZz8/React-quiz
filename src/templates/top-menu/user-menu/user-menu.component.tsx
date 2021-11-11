import React, {useRef} from "react";

// styles
import styles from "./user-menu.module.scss";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

// hooks
import useUserMenu from "./user-menu.hook";
import {useActions} from "../../../hooks/useActions";
import useOnClickOutside from "../../../hooks/useOnClickOutside.hook";

const UserMenu: React.FC = () => {
  const {isModalOpen, setIsModalOpen, toggleIsModalOpen} = useUserMenu();
  const {logoutUser} = useActions();
  const {accessToken, user: {email, firstName, lastName, id: userId}} = useTypedSelector(state => state.login.loginData);
  const refModal = useRef<HTMLDivElement>(null);
  useOnClickOutside(refModal, () => setIsModalOpen(false));

  return (
    <div
      ref={refModal}
      className={styles.userMenu}
    >
      <div
        className={styles.menuContainer}
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
    </div>
  );
};

export default UserMenu;