import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { IoMdHome } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbZoomMoney } from "react-icons/tb";

import styles from './index.module.scss';
import { Fade } from 'react-awesome-reveal';

function SidebarComponent() {
  const location = '/' + useLocation()?.pathname?.split('/')[1];

  return (
    <div className={styles.sidebar}>
      <Fade>
        <RedirectComponent place_redirect="Hogares" page_route={ROUTES.HOMEPAGE_ROUTE} currentPath={location}> <IoMdHome /></RedirectComponent>
        <RedirectComponent place_redirect="Mis finanzas" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <TbZoomMoney /> </RedirectComponent>
        <RedirectComponent place_redirect="Prestamos" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <GiReceiveMoney /> </RedirectComponent>
        <RedirectComponent place_redirect="Deudas" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <GiPayMoney /> </RedirectComponent>
      </Fade>
    </div>
  );
}

function RedirectComponent(
  { place_redirect, page_route, children, currentPath }: { readonly place_redirect: string, readonly page_route: string, readonly children: React.ReactNode, readonly currentPath: string }) {
  const isActive = currentPath === page_route;

  return (
    <Link to={page_route} className={`${styles.link} ${isActive ? styles.active : ''}`}>
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
  );
}

export default memo(SidebarComponent);
