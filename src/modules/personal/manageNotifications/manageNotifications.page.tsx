import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { Button, Table } from 'react-bootstrap';

import { IoReload } from "react-icons/io5";

import styles from './index.module.scss';


import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import useNotifications from 'hooks/useNotifications.hook';
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';
import { BsEye, BsPencil } from 'react-icons/bs';
import { FcApproval } from 'react-icons/fc';

const ManageNotificationsPage: React.FC = () => {
	const { notifications, getAllNotifications, isLoadingNotificationos, updateNotification } = useNotifications()

	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Gestiona las notificaciones" />
			{/* end Titulo */}


			{/* start Acciones crear ingresar */}
			<div className='d-flex justify-content-between flex-wrap mb-5'>
				<Fade>
					<Button variant="outline-primary" onClick={getAllNotifications}>
						Recargar notificaciones <IoReload />
					</Button>
				</Fade>

			</div>
			{/* end Acciones crear ingresar */}


			{/* start listar los hogares del usuario */}
			<Fade>
				
				{isLoadingNotificationos ? <LoaderGoogleComponent /> : notifications?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>Mensaje</th>
							<th style={{width: 100}}> <div className='d-flex justify-content-center'>Marcar visto</div></th>
						</tr>
					</thead>
					<tbody>
						{notifications?.map(r => (<tr key={r?._id}>
							<td>{r.text}</td>
							<td>{!r?.viewed ? <FcApproval style={{cursor: 'pointer'}} onClick={() => updateNotification({...r, viewed: true})}  /> : null}</td>
						</tr>))}
					</tbody>
				</Table>
					: <h3>No hay notificaciones</h3>
				}

			</Fade>

		</div>
	)
}

export default ManageNotificationsPage
