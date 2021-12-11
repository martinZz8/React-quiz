import React from "react";

// styles
import styles from "./show-tests-search-bar.module.scss";

// components
import InputField from "../../../../components/ui/input-field/input-field.component";

// interfaces
import {ISearchBarInputs} from "../show-tests-to-rate-content.types";

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
    </div>
  );
};

export default ShowTestsSearchBar;