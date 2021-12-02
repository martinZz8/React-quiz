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

const ShowQuestionsContent: React.FC = () => {
  const {filteredQuestions, searchBarInputs, areQuestionsLoading, handleSearchBarInputs} = useShowQuestionsContent();

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
              />
            </>
          :
            <LoadingModal/>
        }
      </div>
    </TemplateContentCard>
  );
};

export default ShowQuestionsContent;