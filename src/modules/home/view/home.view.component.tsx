import React from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../resources/routes-constants";


import styles from './index.module.scss';
import HeaderTurnBackComponent from "../../../components/header_turn_back/header_turn_back.component";
import { Fade } from 'react-awesome-reveal';

function HomeViewComponent() {
  const { home_id } = useParams();

  return (
    <div className={styles.main}>
      <Fade direction="down">
        <HeaderTurnBackComponent route={ROUTES.HOMEPAGE_ROUTE} title={`home especifico ${home_id}`} />
      </Fade>

      
      <Fade cascade>
        <p>Personas</p>
        <p>historial apostes y gastos</p>
        <p>gastos</p>
      </Fade>
    </div>
  );
}

export default HomeViewComponent;