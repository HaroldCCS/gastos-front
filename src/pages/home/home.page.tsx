import React from 'react'

import HeaderTurnBackComponent from '../../components/header_turn_back/header_turn_back.component';
import ListHomes from '../../modules/home/list_homes/home.list.component'

import styles from './index.module.scss';

import { Fade } from 'react-awesome-reveal'
import HomeCreateComponent from '../../modules/home/create/home.create.component';
import HomeGetIntoComponent from '../../modules/home/getInto/home.get.into.component';
const HomePage: React.FC = () => {
    return (
        <div className={styles.main}>

            {/* start Titulo */}
            <HeaderTurnBackComponent title="Finanzas del hogar" />
            {/* end Titulo */}


            {/* start Acciones crear ingresar */}
            <div className='d-flex justify-content-between mb-5'>
                <Fade direction='left'>
                    <HomeGetIntoComponent />
                </Fade>
                <Fade direction='right'>
                    <HomeCreateComponent />
                </Fade>
            </div>
            {/* end Acciones crear ingresar */}


            {/* start listar los hogares del usuario */}
            <ListHomes />
            {/* end listar los hogares del usuario */}
        </div>
    )
}

export default HomePage
