import React from "react"

import styles from './index.module.scss';
import TurnBackComponent from "../turn_back/turn_back.component";
import { Fade } from 'react-awesome-reveal';

function HeaderTurnBackComponent({ route, title }: { readonly route?: string, readonly title: string }) {
  return (
    <div className={styles.main}>
      {route && <TurnBackComponent route={route} />}

      <div className={styles["center-title"]}>
        <h1> <Fade cascade duration={100}>{title}</Fade></h1>
      </div>
    </div>
  );
}

export default HeaderTurnBackComponent;