import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io"

import Styles from './index.module.scss'
import useNotifications from 'hooks/useNotifications.hook'

const NotificationCounterComponent = () => {
  const { notifications } = useNotifications()

  return (
    <div className={Styles.notification_counter_container}>
      <IoIosNotificationsOutline/>
      <div className={`${Styles.notification_counter} ${notifications?.filter(n => !n.viewed).length ? Styles.notification_counter_active : ''}`}>{notifications?.filter(n => !n.viewed).length}</div>
    </div>
  )
}

export default NotificationCounterComponent