import React from 'react'

import ListHomes from '../../modules/home/list_homes/home.list.component'

import styles from './index.module.scss';


const HomePage: React.FC = () => {
    return (
        <div className={styles.main}>
            <h1>Seccion finanzas del hogar</h1>
            <ListHomes />
        </div>
    )
}

export default HomePage
