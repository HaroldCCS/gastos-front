import React from 'react'

import HeaderTurnBackComponent from '../../components/header_turn_back/header_turn_back.component';
import ListHomes from '../../modules/home/list_homes/home.list.component'

import styles from './index.module.scss';


const HomePage: React.FC = () => {
    return (
        <div className={styles.main}>
            <HeaderTurnBackComponent title="Finanzas del hogar" />
            <ListHomes />
        </div>
    )
}

export default HomePage
