import React, { useEffect } from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsDoorOpenFill } from "react-icons/bs";
import styles from './index.module.scss'
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from '../../../resources/routes-constants';
import { Fade } from 'react-awesome-reveal';

interface Home {
  _id: string
  name: string
}

function HomeListComponent() {
  const [homes, setHomes] = React.useState<Home[]>([]);

  useEffect(() => {
    setHomes([
      { _id: '1', name: 'Casa Familiar' },
      { _id: '2', name: 'Apartamento Soacha' },
      { _id: '3', name: 'Casa Ciudad Bolivar' },
    ])
  }, []);


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
