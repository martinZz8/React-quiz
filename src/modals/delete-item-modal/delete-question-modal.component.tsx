import React from "react";

// styles
import styles from "./delete-question-modal.module.scss";

//templates
import TemplateBasicModal from "../basic-modal/basic-modal.template";

// components
import Button from "../../components/ui/button/button.component";
import LoadingModal from "../loading-modal/loading-modal.component";

// interfaces
interface IDeleteItemModal {
  title: string;
  onConfirmClick: () => void;
  onDeclineClick: () => void;
  isDeleteProcessing: boolean;
}

const DeleteItemModal: React.FC<IDeleteItemModal> = ({title, onConfirmClick, onDeclineClick, isDeleteProcessing}) => {

  return (
    <TemplateBasicModal
      onOutClick={() => {
        if (!isDeleteProcessing) {
          onDeclineClick();
        }
      }}
    >
      <div className={styles.deleteItemModalContent}>
        <div className={styles.header}>
          <p>{title}</p>
        </div>
        <div className={styles.buttonsWrap}>
          <div className={styles.singleButtonWrap}>
            <Button
              type="button"
              title="Tak"
              backgroundColor="lightPurple"
              fontColor="white"
              handleClick={onConfirmClick}
            />
          </div>
          <div className={styles.singleButtonWrap}>
            <Button
              type="button"
              title="Nie"
              backgroundColor="red"
              fontColor="white"
              handleClick={onDeclineClick}
            />
          </div>
        </div>
        {
          isDeleteProcessing ?
            <LoadingModal/>
          :
            null
        }
      </div>
    </TemplateBasicModal>
  );
};

export default DeleteItemModal;
