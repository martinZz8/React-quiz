import React, {useState} from "react";

// styles
import styles from "./one-list.module.scss";

// hooks
import useOneList from "./one-list.hook";

// interfaces
import {IQuestion, IStudent} from "../list-questions-or-students.types";

// components
import LoadingModal from "../../../../../modals/loading-modal/loading-modal.component";
import OneListItem from "./item/one-list-item.component";
import InputField from "../../../../../components/ui/input-field/input-field.component";

interface IOneList {
  isLoading: boolean;
  isAvailableView?: boolean;
  questionsToShow?: IQuestion[];
  studentsToShow?: IStudent[];
  toggleAvailableIds: (id: number) => void;
}

const OneList: React.FC<IOneList> = ({isLoading, isAvailableView, questionsToShow, studentsToShow, toggleAvailableIds}) => {
  const [isQuestionsShow, setIsQuestionsShow] = useState<boolean>(questionsToShow !== undefined);
  const {
    openedIds,
    closeIfOpenedId,
    toggleOpenedIds,
    searchInput,
    setSearchInput,
    filteredQuestionsToShow,
    filteredStudentsToShow
  } = useOneList(questionsToShow, studentsToShow);

  return (
    <div className={styles.oneList}>
      {
        isAvailableView ?
          <div className={styles.searchBar}>
            <InputField
              type="text"
              label={isQuestionsShow ? "Wyszukaj po pytaniu" : "Wyszukaj po adresie email"}
              placeholder={isQuestionsShow ? "Wyszukaj po pytaniu" : "Wyszukaj po adresie email"}
              name="searchInput"
              value={searchInput}
              handleChange={(name: string, value: string) => setSearchInput(value)}
            />
          </div>
        :
          null
      }
      <div className={`${styles.header} ${!isAvailableView ? styles.spaceTop : ""}`}>
        <p>{isAvailableView ? (isQuestionsShow ? "Dostępne" : "Dostępni") : (isQuestionsShow ? "Wybrane" : "Wybrani")}</p>
      </div>
      <div className={styles.contentWrap}>
        {
          !isLoading ?
            <div className={`
              customScrollBar
              ${styles.content}
              ${(isQuestionsShow && filteredQuestionsToShow.length === 0) || (!isQuestionsShow && filteredStudentsToShow.length === 0) ? styles.center : ""}`
            }>
              {
                isQuestionsShow ?
                  filteredQuestionsToShow.length > 0 ?
                    questionsToShow && filteredQuestionsToShow.map((question, index) =>
                      <div
                        key={`question_${question.id}`}
                        className={styles.oneListItemWrap}
                      >
                        <OneListItem
                          isAvailableView={isAvailableView}
                          questionToShow={question}
                          ordinalNumber={index+1}
                          isOpened={openedIds.includes(question.id)}
                          onItemClick={() => toggleOpenedIds(question.id)}
                          onAddOrRemoveClick={() => {
                            toggleAvailableIds(question.id);
                            closeIfOpenedId(question.id);
                          }}
                        />
                      </div>
                    )
                  :
                    <p>Nie ma żadnych pytań</p>
                :
                  filteredStudentsToShow.length > 0 ?
                    studentsToShow && filteredStudentsToShow.map((student, index) =>
                      <div
                        key={`student_${student.id}`}
                        className={styles.oneListItemWrap}
                      >
                        <OneListItem
                          isAvailableView={isAvailableView}
                          studentToShow={student}
                          ordinalNumber={index+1}
                          isOpened={openedIds.includes(student.id)}
                          onItemClick={() => toggleOpenedIds(student.id)}
                          onAddOrRemoveClick={() => {
                            toggleAvailableIds(student.id);
                            closeIfOpenedId(student.id);
                          }}
                        />
                      </div>
                    )
                  :
                    <p>Nie ma żadnych studentów</p>
              }
            </div>
          :
            <LoadingModal/>
        }
      </div>
    </div>
  );
};

export default OneList;