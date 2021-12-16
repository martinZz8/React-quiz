import React from "react";

// styles
import styles from "./teacher-cards-list.module.scss";

// redux
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

// hooks
import useTeacherCardsList from "./teacher-cards-list.hook";

// templates
import TemplateContentCard from "../../../../templates/content-card/content-card.template";
import MainMenuHeader from "../../../../components/main-menu-header/main-menu-header.component";

// components
import SingleCard from "./single-card/single-card.component";

const TeacherCardsList: React.FC = () => {
  const {isActiveQuestionCards, setIsActiveQuestionCards} = useTeacherCardsList();

  const firstName = useTypedSelector(state => state.login.loginData.user.firstName);

  return (
    <TemplateContentCard
      title={<p>Cześć <b>{firstName}!</b></p>}
    >
      <div className={styles.cardsView}>
        <MainMenuHeader
          firstTitle="Pytania"
          secondTitle="Testy"
          onFirstTitleClick={() => setIsActiveQuestionCards(true)}
          onSecondTitleClick={() => setIsActiveQuestionCards(false)}
          isFirstHeaderActive={isActiveQuestionCards}
        />
        <div className={`customScrollBar ${styles.cards} ${!isActiveQuestionCards ? styles.smallCards : ""}`}>
          {
            isActiveQuestionCards ?
              <>
                <SingleCard
                  headerText="Lista pytań"
                  subText="Przeglądaj, edytuj i usuwaj swoje pytania."
                  svgName="list"
                  buttonTitle="Przeglądaj"
                  linkToRedirect="/pytania"
                  isSmallWidth={false}
                />
                <SingleCard
                  headerText="Dodaj pytanie"
                  subText="Dodaj nowe pytanie, by móc potem przypisać je do testu."
                  svgName="add"
                  buttonTitle="Dodaj pytanie"
                  linkToRedirect="/pytania/dodaj"
                  isSmallWidth={false}
                />
              </>
            :
              <>
                <SingleCard
                  headerText="Lista testów"
                  subText="Przeglądaj swoje testy i z łatwością je edytuj."
                  svgName="list"
                  buttonTitle="Przeglądaj"
                  linkToRedirect="/testy"
                  isSmallWidth={true}
                />
                <SingleCard
                  headerText="Utwórz test"
                  subText="Zaplanuj test z wcześniej dodanych pytań."
                  svgName="add"
                  buttonTitle="Utwórz test"
                  linkToRedirect="/testy/dodaj"
                  isSmallWidth={true}
                />
                <SingleCard
                  headerText="Zakończone testy"
                  subText="Oceniaj zakończone testy i przeglądaj ich wyniki."
                  svgName="results"
                  buttonTitle="Sprawdź"
                  linkToRedirect="/testy/zakonczone"
                  isSmallWidth={true}
                />
              </>
          }
        </div>
      </div>
    </TemplateContentCard>
  );
};

export default TeacherCardsList;