import React, { memo } from 'react'
import { ROUTES } from '../../resources/routes-constants';
import { Link } from 'react-router-dom';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { IoMdHome } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbZoomMoney } from "react-icons/tb";

import styles from './index.module.scss'
import { Fade } from 'react-awesome-reveal';

function SidebarComponent() {
  return (

    <div className={styles.sidebar}>
      <Fade>
        <RedirectComponent place_redirect="Hogares" page_route={ROUTES.HOMEPAGE_ROUTE} > <IoMdHome /></RedirectComponent>
        <RedirectComponent place_redirect="Mis finanzas" page_route={ROUTES.PERSONALPAGE_ROUTE} > <TbZoomMoney /> </RedirectComponent>
        <RedirectComponent place_redirect="Prestamos" page_route={ROUTES.PERSONALPAGE_ROUTE} > <GiReceiveMoney /> </RedirectComponent>
        <RedirectComponent place_redirect="Deudas" page_route={ROUTES.PERSONALPAGE_ROUTE} > <GiPayMoney /> </RedirectComponent>
      </Fade>
    </div>
  );
}

function RedirectComponent({ place_redirect, page_route, children }: { place_redirect: string, page_route: string, children: React.ReactNode }) {
  return (
    <Link to={page_route} className={styles.link} >
      <OverlayTrigger
        placement={'auto'}
        overlay={
          <Tooltip id={`tooltip-right`}>
            {place_redirect}
          </Tooltip>
        }
      >
        <div>{children}</div>
      </OverlayTrigger>
    </Link>
  )
}

export default memo(SidebarComponent)
