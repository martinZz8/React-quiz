import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Helmet} from "react-helmet-async";

// styles
import styles from "./view.module.scss";

// templates

// components

// interface
interface templateView extends RouteComponentProps<any> {
    viewTitle: string;
    appVersion: string;
}

const TemplateView: React.FC<templateView> = ({
    children,
    viewTitle,
    appVersion
  }) => {

  return (
    <>
      <Helmet>
        <title>{viewTitle} {appVersion}</title>
      </Helmet>
      {
          <div className={styles.app}>
            {/*<TemplateAside>*/}
            {/*  <Logo/>*/}
            {/*  <NavigationMain/>*/}
            {/*</TemplateAside>*/}
            {children}
          </div>
      }
    </>
  );
};

export default withRouter(TemplateView);