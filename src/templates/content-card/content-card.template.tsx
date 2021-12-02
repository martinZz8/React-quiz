import React, {ReactElement} from "react";

// styles
import styles from "./content-card.module.scss";

// interfaces
interface ITemplateContentCard {
  title?: string | ReactElement;
  extendedSize?: boolean;
}

const TemplateContentCard: React.FC<ITemplateContentCard> = ({title, children, extendedSize}) => {

  return (
    <div className={`${styles.container} ${extendedSize ? styles.extendedSize : ""}`}>
      {
        title ?
          <div className={styles.header}>
            {title}
          </div>
        :
          null
      }
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default TemplateContentCard;