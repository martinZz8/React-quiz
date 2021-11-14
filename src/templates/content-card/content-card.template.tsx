import React, {ReactElement} from "react";

// styles
import styles from "./content-card.module.scss";

// interfaces
interface ITemplateContentCard {
  title: string | ReactElement;
}

const TemplateContentCard: React.FC<ITemplateContentCard> = ({title, children}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {title}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default TemplateContentCard;