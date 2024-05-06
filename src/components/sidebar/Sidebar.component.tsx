import React, { memo } from 'react'
import { ROUTES } from '../../resources/routes-constants';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

import styles from './index.module.scss'

function SidebarComponent() {
  return (
    <div className={styles.sidebar}>
      <RedirectComponent place_redirect="Hogares" page_route={ROUTES.HOMEPAGE_ROUTE} > <IoMdHome size={32} /> </RedirectComponent>
      <RedirectComponent place_redirect="Personal" page_route={ROUTES.PERSONALPAGE_ROUTE} > <FaUser size={32} /> </RedirectComponent>
    </div>
  );
}

function RedirectComponent({ place_redirect, page_route, children }: { place_redirect: string, page_route: string, children: React.ReactNode }) {
  return (
    <OverlayTrigger
      placement={'auto'}
      overlay={
        <Tooltip id={`tooltip-right`}>
          {place_redirect}
        </Tooltip>
      }
    >
      <Link to={page_route} className={styles.link} > {children}</Link>
    </OverlayTrigger>
  )
}

export default memo(SidebarComponent)