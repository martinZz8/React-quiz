import React from "react";

// styles
import styles from "./show-questions-content.module.scss";

//templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// hooks
import useShowQuestionsContent from "./show-questions-content.hook";

// components
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import ShowQuestionsSearchBar from "./search-bar/show-questions-search-bar.component";
import ShowQuestionsList from "./questions-list/show-questions-list.component";
import DeleteItemModal from "../../../modals/delete-item-modal/delete-question-modal.component";

const ShowQuestionsContent: React.FC = () => {
  const {
    filteredQuestions,
    searchBarInputs,
    areQuestionsLoading,
    handleSearchBarInputs,
    isDeleteQuestionModalOpened,
    setIsDeleteQuestionModalOpened,
    setQuestionIdToBeDeleted,
    deleteQuestion,
    isDeletingQuestionProcessing
  } = useShowQuestionsContent();

  return (
    <TemplateContentCard
      title={<p>Twoje pytania</p>}
      extendedSize
    >
      <div className={styles.showQuestionsContent}>
        {
          !areQuestionsLoading ?
            <>
              <ShowQuestionsSearchBar
                searchBarInputs={searchBarInputs}
                handleSearchBarInputs={handleSearchBarInputs}
              />
              <ShowQuestionsList
                filteredQuestions={filteredQuestions}
                setIsDeleteQuestionModalOpened={setIsDeleteQuestionModalOpened}
                setQuestionIdToBeDeleted={setQuestionIdToBeDeleted}
              />
            </>
          :
            <LoadingModal/>
        }
        {
          isDeleteQuestionModalOpened ?
            <DeleteItemModal
              title="Czy chcesz usunąć pytanie?"
              onConfirmClick={deleteQuestion}
              onDeclineClick={() => setIsDeleteQuestionModalOpened(false)}
              isDeleteProcessing={isDeletingQuestionProcessing}
            />
          :
            null
        }
      </div>
    </TemplateContentCard>
  );
};

export default ShowQuestionsContent;