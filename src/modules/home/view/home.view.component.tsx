import React from "react";

import { useParams } from "react-router-dom";
import { Fade } from 'react-awesome-reveal';

import { ROUTES } from "../../../resources/routes-constants";
import HeaderTurnBackComponent from "../../../components//header_turn_back/header_turn_back.component";
import HomeRepairsComponent from '../../home/repairs/home.repairs.component';
import HomePeopleComponent from "../../home/people/home.people.component";

import styles from './index.module.scss';


function HomeViewComponent() {
  const { home_id } = useParams();

  return (
    <div className={styles.main}>
      <Fade direction="down">
        <HeaderTurnBackComponent route={ROUTES.HOMEPAGE_ROUTE} title={`home especifico ${home_id}`} />
      </Fade>


      <div className="d-flex justify-content-around flex-wrap align-content-center align-items-center gap-5">
        <Fade cascade>
          <HomeRepairsComponent />
          <HomePeopleComponent />
        </Fade>
      </div>

    </div>
  );
}

export default HomeViewComponent;