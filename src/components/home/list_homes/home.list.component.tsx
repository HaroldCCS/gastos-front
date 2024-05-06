import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { BsDoorOpenFill } from "react-icons/bs";
import styles from './index.module.scss'
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from '../../../resources/routes-constants';

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
      {homes.map((home: Home) => (
        <Card key={home._id} border="info" style={{ width: '18rem' }}>
          <Card.Header className={styles['card-header']}>
            <div>{home.name}</div>
            <Link to={`${ROUTES.HOMEPAGE_ROUTE}/${home._id}`}><BsDoorOpenFill size={32} /></Link>
          </Card.Header>
        </Card>
      ))}
    </div>

  );
}

export default HomeListComponent;