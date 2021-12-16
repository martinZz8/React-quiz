import React from "react";

// styles
import styles from "./show-completed-tests-content.module.scss";

// templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// hooks
import useShowTestsToRateContent from "./show-completed-tests-content.hook";

// components
import ShowTestsSearchBar from "./search-bar/show-tests-search-bar.component";
import ShowTestsList from "./tests-list/show-tests-list.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";

const ShowCompletedTestsContent: React.FC = () => {
  const {
    filteredTests,
    searchBarInputs,
    handleSearchBarInputs,
    areTestsLoading
  } = useShowTestsToRateContent();

  return (
    <TemplateContentCard
      title={<p>Zakończone testy</p>}
      extendedSize
    >
      <div className={styles.showTestsContent}>
        {
          !areTestsLoading ?
            <>
              <ShowTestsSearchBar
                searchBarInputs={searchBarInputs}
                handleSearchBarInputs={handleSearchBarInputs}
              />
              <ShowTestsList
                filteredTests={filteredTests}
              />
            </>
          :
            <LoadingModal/>
        }
      </div>
    </TemplateContentCard>
  );
};

export default ShowCompletedTestsContent;

