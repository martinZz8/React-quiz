import React from "react";

// styles
import styles from "./user-menu.module.scss";

// redux
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const UserMenu: React.FC = () => {
  const {email, firstName, lastName} = useTypedSelector(state => state.login.loginData.user);

  return (
    <div className={styles.userMenu}>
      <div className={styles.dot}/>
      <div className={styles.userData}>
        <p className={styles.userName}>{firstName} {lastName}</p>
        <p className={styles.userEmail}>{email}</p>
      </div>
    </div>
  );
};

export default UserMenu;