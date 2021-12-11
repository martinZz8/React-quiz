import React from "react";

// styles
import styles from "./show-tests-to-rate-content.module.scss";

// templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";


// hooks
import useShowTestsToRateContent from "./show-tests-to-rate-content.hook";

// components
import ShowTestsSearchBar from "./search-bar/show-tests-search-bar.component";
import ShowTestsList from "./tests-list/show-tests-list.component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";

const ShowTestToRateContent: React.FC = () => {
  const {
    filteredTests,
    searchBarInputs,
    handleSearchBarInputs,
    areTestsLoading
  } = useShowTestsToRateContent();

  return (
    <TemplateContentCard
      title={<p>Testy do oceny</p>}
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

export default ShowTestToRateContent;

