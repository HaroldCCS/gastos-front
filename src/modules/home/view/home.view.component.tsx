import React from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../resources/routes-constants";


import styles from './index.module.scss';
import HeaderTurnBackComponent from "../../../components/header_turn_back/header_turn_back.component";

function HomeViewComponent() {
  const { home_id } = useParams();

  return (
    <div className={styles.main}>
      <HeaderTurnBackComponent route={ROUTES.HOMEPAGE_ROUTE} title={`home especifico ${home_id}`} />

      <p>Personas</p>
      <p>historial apostes y gastos</p>
      <p>gastos</p>
    </div>
  );
}

export default HomeViewComponent;