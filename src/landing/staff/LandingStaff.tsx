import React from 'react'
import Header from '../../components/header/Header.component';
import Sidebar from '../../components/sidebar/Sidebar.component';

import styles from './landingStaff.module.scss'

function LandingStaff(props: { children: React.ReactNode }) {
  return ( 
    <>
      <header> 
        <Header />
      </header>
      <main className={styles.main}>
        <Sidebar/>
        {props.children}
      </main>
      <footer>
      </footer>
    </>
  );
}

export default LandingStaff;