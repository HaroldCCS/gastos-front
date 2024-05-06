import React from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../resources/routes-constants";

import styles from './index.module.scss';

function HomeViewComponent(props: any) {
  const { home_id } = useParams();

  return (<div className={styles.main}>
  
    <h2> <Link to={ROUTES.HOMEPAGE_ROUTE}><IoReturnDownBack size={32}/></Link> home especifico {home_id}</h2>



    <p>Personas</p>
    <p>historial apostes y gastos</p>
    <p>gastos</p>
  </div>);
}

export default HomeViewComponent;