import React from "react";
import {RouteComponentProps, withRouter} from "react-router";

// styles
import styles from "./single-card.module.scss";

//SVGS
import {ReactComponent as SVGList} from "../../../../../assets/svg/list.svg";
import {ReactComponent as SVGAdd} from "../../../../../assets/svg/add.svg";
import {ReactComponent as SVGResults} from "../../../../../assets/svg/results.svg";

// components
import Button from "../../../../../components/ui/button/button.component";

// interfaces
interface ISingleCard extends RouteComponentProps {
  headerText: string;
  subText: string;
  svgName: "list" | "add" | "results";
  buttonTitle: string;
  linkToRedirect: string;
  isSmallWidth: boolean;
}

const SingleCard: React.FC<ISingleCard> = ({
    headerText,
    subText,
    svgName,
    buttonTitle,
    linkToRedirect,
    isSmallWidth,
    history
  }) => {

  return (
    <div
      className={`${styles.singleCard} ${isSmallWidth ? styles.smallWidth : ""}`}
      onClick={() => history.push(linkToRedirect)}
    >
      <p className={styles.header}>
        {headerText}
      </p>
      <p>
        {subText}
      </p>
      <div className={styles.imageWrap}>
        {
          svgName === "list" ?
            <SVGList/>
          : svgName === "add" ?
            <SVGAdd/>
          :
            <SVGResults/>
        }
      </div>
      <div className={styles.buttonWrap}>
        <Button
          type="button"
          title={buttonTitle}
          fontColor="white"
          backgroundColor="purple"
        />
      </div>
    </div>
  );
};

export default withRouter(SingleCard);