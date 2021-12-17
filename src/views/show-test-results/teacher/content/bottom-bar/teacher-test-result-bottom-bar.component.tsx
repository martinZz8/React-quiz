import React from "react";

// styles
import styles from "./teacher-test-result-bottom-bar.module.scss";

// components
import Button from "../../../../../components/ui/button/button.component";

// interfaces
interface ITeacherTestResultBottomBar {
  actualPage: number;
  maxPage: number;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
  onCSVDownloadClick: () => void;
  onPDFDownloadClick: () => void;
  onDOCXDownloadClick: () => void;
}

const TeacherTestResultBottomBar: React.FC<ITeacherTestResultBottomBar> = ({
   actualPage,
   maxPage,
   onPrevPageClick,
   onNextPageClick,
   onCSVDownloadClick,
   onPDFDownloadClick,
   onDOCXDownloadClick
  }) => {

  return (
    <div className={styles.teacherTestResultBottomBar}>
      <div className={styles.navigation}>
        <div className={styles.buttonWrap}>
          <Button
            type="button"
            title="Poprzedni uczeń"
            backgroundColor="lightPurple"
            fontColor="white"
            handleClick={onPrevPageClick}
            disabled={actualPage === 1}
          />
        </div>
        <div className={styles.pageInfo}>
          <p>{actualPage}/{maxPage}</p>
        </div>
        <div className={styles.buttonWrap}>
          <Button
            type="button"
            title="Następny uczeń"
            backgroundColor="lightPurple"
            fontColor="white"
            handleClick={onNextPageClick}
            disabled={actualPage === maxPage}
          />
        </div>
      </div>
      <div className={styles.downloadButtons}>
        <div className={styles.buttonWrap}>
          <Button
            type="button"
            title="Pobierz CSV"
            backgroundColor="purple"
            fontColor="white"
            handleClick={onCSVDownloadClick}
          />
        </div>
        <div className={styles.buttonWrap}>
          <Button
            type="button"
            title="Pobierz PDF"
            backgroundColor="purple"
            fontColor="white"
            handleClick={onPDFDownloadClick}
          />
        </div>
        <div className={styles.buttonWrap}>
          <Button
            type="button"
            title="Pobierz DOCX"
            backgroundColor="purple"
            fontColor="white"
            handleClick={onDOCXDownloadClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherTestResultBottomBar;