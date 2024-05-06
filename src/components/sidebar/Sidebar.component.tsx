import React, {memo} from 'react'
import styles from './sidebar.module.scss'

function Sidebar() {
  console.log('sidebar', Date.now())
  return (
    <div className={styles.sidebar}>
      <button>menu</button>
      <button>tesx</button>
      <button>jszx</button>
    </div>
  );
}

export default memo(Sidebar)