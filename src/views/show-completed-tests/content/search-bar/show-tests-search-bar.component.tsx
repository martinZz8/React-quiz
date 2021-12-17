import React from "react";

// styles
import styles from "./show-tests-search-bar.module.scss";

// data
import {selectTestStatusOptions} from "../show-completed-tests-content.data";

// components
import InputField from "../../../../components/ui/input-field/input-field.component";
import Select from "../../../../components/ui/select/select.component";

// interfaces
import {ISearchBarInputs} from "../show-completed-tests-content.types";

interface IShowTestsSearchBar {
  searchBarInputs: ISearchBarInputs;
  handleSearchBarInputs: (name: string, value: string) => void;
}

const ShowTestsSearchBar: React.FC<IShowTestsSearchBar> = ({searchBarInputs, handleSearchBarInputs}) => {

  return (
    <div className={styles.showTestsSearchBar}>
      <div className={styles.testNameInputWrap}>
        <InputField
          type="text"
          name="testName"
          value={searchBarInputs.testName}
          label="Nazwa testu"
          placeholder="Nazwa testu"
          handleChange={handleSearchBarInputs}
        />
      </div>
      <div className={styles.statusSelectWrap}>
        <Select
          name="testStatus"
          value={searchBarInputs.testStatus}
          label="Status testu"
          placeholder="Status testu"
          options={selectTestStatusOptions.map(option => ({
            value: option.value,
            textToShow: option.textToShow
          }))}
          handleChange={handleSearchBarInputs}
          isExtended
        />
      </div>
    </div>
  );
};

export default ShowTestsSearchBar;