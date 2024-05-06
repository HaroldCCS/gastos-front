
import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import style from './header.module.scss'

function Header() {
  console.log('header', Date.now())

  return (
    <div className={style.header}>
      <Link to={'/'}> home</Link>
      <br />
      <br />
      <Link to={'/404'}> 404</Link>
    </div>
  );
}

export default memo(Header);