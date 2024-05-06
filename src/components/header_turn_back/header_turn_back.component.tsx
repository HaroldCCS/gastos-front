import React from "react"

import styles from './index.module.scss';
import TurnBackComponent from "../turn_back/turn_back.component";

function HeaderTurnBackComponent({ route, title }: { readonly route: string, readonly title: string }) {
  return (
    <div className={styles.main}>
      <TurnBackComponent route={route} />

      <div className={styles["center-title"]}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeaderTurnBackComponent;