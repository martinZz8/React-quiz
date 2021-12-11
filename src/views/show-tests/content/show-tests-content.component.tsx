import React from "react";

// styles
import styles from "./show-tests-content.module.scss";

//templates
import TemplateContentCard from "../../../templates/content-card/content-card.template";

// hooks
import useShowTestsContent from "./show-tests-content.hook";

// components
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import ShowTestsSearchBar from "./search-bar/show-tests-search-bar.component";
import DeleteItemModal from "../../../modals/delete-item-modal/delete-question-modal.component";
import ShowTestsList from "./tests-list/show-tests-list.component";

const ShowTestsContent: React.FC = () => {
  const {
    filteredTests,
    questions,
    students,
    searchBarInputs,
    handleSearchBarInputs,
    isDeleteTestModalOpened,
    setIsDeleteTestModalOpened,
    isDeletingTestProcessing,
    setTestIdToBeDeleted,
    areTestsLoading,
    deleteTest
  } = useShowTestsContent();

  return (
    <TemplateContentCard
      title={<p>Twoje testy</p>}
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
                questions={questions}
                students={students}
                setIsDeleteTestModalOpened={setIsDeleteTestModalOpened}
                setTestIdToBeDeleted={setTestIdToBeDeleted}
              />
            </>
          :
            <LoadingModal/>
        }
        {
          isDeleteTestModalOpened ?
            <DeleteItemModal
              title="Czy chcesz usunąć test?"
              onConfirmClick={deleteTest}
              onDeclineClick={() => setIsDeleteTestModalOpened(false)}
              isDeleteProcessing={isDeletingTestProcessing}
            />
          :
            null
        }
      </div>
    </TemplateContentCard>
  );
};

export default ShowTestsContent;