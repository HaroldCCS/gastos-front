import React, { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { IoMdHome } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TbZoomMoney, TbLogout } from "react-icons/tb";

import styles from './index.module.scss';
import { Fade } from 'react-awesome-reveal';
import { useAppDispatch } from 'store';
import tokenAction from 'store/auth/token/token.action';
import myMoneyHistoryAction from 'store/personalFinance/myMoneyHistory/myMoneyHistory.action';
import userAction from 'store/auth/user/user.action';
import homeAction from 'store/home/home.action';

function SidebarComponent() {
  const location = '/' + useLocation()?.pathname?.split('/')[1];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(tokenAction.drop());
    dispatch(myMoneyHistoryAction.delete_all());
    dispatch(userAction.delete_all());
    dispatch(homeAction.delete_all());
    navigate(ROUTES.LOGIN);
  }

  return (
    <div className={styles.sidebar}>
      <Fade>
        <RedirectComponent place_redirect="Mis finanzas" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <TbZoomMoney /> </RedirectComponent>
        {/* <RedirectComponent place_redirect="Hogares" page_route={ROUTES.HOMEPAGE_ROUTE} currentPath={location}> <IoMdHome /></RedirectComponent>
        <RedirectComponent place_redirect="Prestamos" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <GiReceiveMoney /> </RedirectComponent>
        <RedirectComponent place_redirect="Deudas" page_route={ROUTES.PERSONALPAGE_ROUTE} currentPath={location}> <GiPayMoney /> </RedirectComponent> */}
        <RedirectComponent place_redirect="Cerrar sesión" callback={logout} currentPath={location}> <TbLogout /> </RedirectComponent>
      </Fade>
    </div>
  );
}

function RedirectComponent(
  { place_redirect, page_route, children, currentPath, callback }: { readonly place_redirect: string, readonly page_route?: string, readonly children: React.ReactNode, readonly currentPath: string, callback?: any }) {
  const isActive = currentPath === page_route;

  return (
    <Link onClick={() => callback ? callback() : null} to={page_route || ''} className={`${styles.link} ${isActive ? styles.active : ''}`}>
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
