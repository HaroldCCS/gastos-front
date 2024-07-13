import React, { useEffect } from 'react'

import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsDoorOpenFill } from "react-icons/bs";
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';


import styles from './index.module.scss'
import { ROUTES } from '../../../resources/routes-constants';
import { useAppDispatch, useAppSelector } from '../../../store';

interface Home {
  _id: string
  name: string
}



function HomeListComponent() {
  const dispatch = useAppDispatch();
  const homes = useAppSelector(state => state.home.homes);

  console.log('homes:', homes);
  return (
    <div className={styles.main}>
      <Fade cascade className={styles.card}>
        {homes.map((home: Home) => <CardComponent key={home._id} home={home} />)}
      </Fade>
    </div>
  );
}

export default HomeListComponent;


function CardComponent({ home }: { readonly home: Home }) {
  return (
    <Card key={home._id} border="info">

      <Card.Header className={styles['card-header']}>
        <p>{home.name}</p>
        <OverlayTrigger
          placement={'auto'}
          overlay={
            <Tooltip id={`tooltip-entrar`}>
              Entrar
            </Tooltip>
          }
        >
          <Link to={`${ROUTES.HOMEPAGE_ROUTE}/${home._id}`}>
            <BsDoorOpenFill className='icon-standar' />
          </Link>
        </OverlayTrigger>
      </Card.Header>
    </Card>
  );
}
