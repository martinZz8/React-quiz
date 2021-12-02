import React from "react";

// styles
import styles from "./show-questions-search-bar.module.scss";

// data
import {selectQuestionTypeOptions} from "../show-questions-content.data";

// components
import InputField from "../../../../components/ui/input-field/input-field.component";
import Select from "../../../../components/ui/select/select.component";

// interfaces
import {ISearchBarInputs} from "../show-qeustions-content.types";

interface IShowQuestionsSearchBar {
  searchBarInputs: ISearchBarInputs;
  handleSearchBarInputs: (name: string, value: string) => void;
}

const ShowQuestionsSearchBar: React.FC<IShowQuestionsSearchBar> = ({searchBarInputs, handleSearchBarInputs}) => {

  return (
    <div className={styles.showQuestionsSearchBar}>
      <div className={styles.questionInputWrap}>
        <InputField
          type="text"
          name="question"
          value={searchBarInputs.question}
          label="Treść pytania"
          placeholder="Treść pytania"
          handleChange={handleSearchBarInputs}
        />
      </div>
      <div className={styles.typeSelectWrap}>
        <Select
          name="type"
          value={searchBarInputs.type}
          label="Typ pytania"
          placeholder="Typ pytania"
          options={selectQuestionTypeOptions.map(option => ({
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

export default ShowQuestionsSearchBar;