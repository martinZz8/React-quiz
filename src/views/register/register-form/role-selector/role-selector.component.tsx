import React, {useState, useEffect} from "react";

// styles
import styles from "./role-selector.module.scss";

// data
import {userRoles} from "../register-form.data";

// interfaces
interface IRoleSelector {
  selectedRole: string;
  setRole: (value: string) => void;
}

const RoleSelector: React.FC<IRoleSelector> = ({selectedRole, setRole}) => {
  const [studentTextStyle, setStudentTextStyle] = useState(selectedRole === userRoles.student ? styles.textSelected : styles.textNotSelected);
  const [teacherTextStyle, setTeacherTextStyle] = useState(selectedRole === userRoles.student ? styles.textNotSelected : styles.textSelected);
  const [canChangeRole, setCanChangeRole] = useState<boolean>(true); //semaphore

  // --Handle changing colors of the text and releasing the semaphore canChangeRole--
  useEffect(() => {
    if (selectedRole === userRoles.student) {
      setTeacherTextStyle(styles.textNotSelected);

      setTimeout(() => {
        setStudentTextStyle(styles.textSelected);
        setCanChangeRole(true);
      }, 300);
    }
    else {
      setStudentTextStyle(styles.textNotSelected);

      setTimeout(() => {
        setTeacherTextStyle(styles.textSelected);
        setCanChangeRole(true);
      }, 300);
    }
  },[selectedRole]);

  // --Change role, if it's not the same and canChangeRole semaphore is released--
  const setRoleIfAllowed = (newRole: string): void => {
    if (selectedRole !== newRole && canChangeRole) {
      setCanChangeRole(false);
      setRole(newRole);
    }
  };

  return (
    <div className={styles.roleSelector}>
      <div
        className={`${styles.student} ${userRoles.student === selectedRole ? styles.noPointer : ""}`}
        onClick={() => setRoleIfAllowed(userRoles.student)}
      >
        <p className={`noSelect ${studentTextStyle}`}>
          Uczeń
        </p>
      </div>
      <div
        className={`${styles.teacher} ${userRoles.teacher === selectedRole ? styles.noPointer : ""}`}
        onClick={() => setRoleIfAllowed(userRoles.teacher)}
      >
        <p className={`noSelect ${teacherTextStyle}`}>
          Nauczyciel
        </p>
      </div>
      {/*Selector*/}
      <div className={`${styles.selector} ${selectedRole === userRoles.student ? styles.selectedStudent : styles.selectedTeacher}`}/>
    </div>
  );
};

export default RoleSelector;