import React, { useEffect, useState } from 'react'
import HeaderTurnBackComponent from "components/header_turn_back/header_turn_back.component";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { FaDeleteLeft } from "react-icons/fa6";

import { Fade } from 'react-awesome-reveal';
import { useAppDispatch, useAppSelector } from 'store';
import { Interface } from 'store/personalFinance/myMoneyHistory';
import { Accordion, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import MoneyFormatter from 'utility/MoneyFormatter';
import ACTIONS from 'store/personalFinance/myMoneyHistory/myMoneyHistory.action';
import MyMoneyHistoryCreateComponent from 'modules/personal/myMoneyHistory/create/myMoneyHistory.create.component';
import Swal from 'sweetalert2';

import styles from './index.module.scss';
import MoneyHistoryService from 'services/myMoneyHistory/moneyHistory.service';
import LoaderV1Component from '../../components/loaders/loaderV1/loaderV1.component';

const PersonalFinancePage: React.FC = () => {
	const storage = useAppSelector(state => state.personal_finances.my_money_history);

	const [orderMyMonth, setOrderMyMonth] = React.useState<{ date: string, data: Interface[] }[]>([]);

	useEffect(() => {

		const data = new Map<string, Interface[]>();

		const order = storage.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		for (const money of order) {
			const date = new Date(money.date);

			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			const key = `${year}-${month}`;

			if (!data.has(key)) data.set(key, []);
			data.get(key)?.push(money);
		}

		const keys = Array.from(data.keys());
		const values: { date: string, data: Interface[] }[] = []

		for (const key of keys) {
			const data_year = data.get(key) || [];
			values.push({ data: data_year, date: key });
		}

		setOrderMyMonth(values);
	}, [storage]);

	return (
		<div className={styles.main}>
			<Fade direction='down'>
				<HeaderTurnBackComponent title="Sección finanzas personales" />
			</Fade>

			<MyMoneyHistoryCreateComponent />


			<div className='d-flex justify-content-center gap-5 mt-5 flex-wrap'>
				{orderMyMonth.map((data) => (
					<div key={data.date} className='gap-5 d-flex justify-content-center'>
						<FileRepair data={data.data} />
					</div>
				))}
			</div>
		</div>
	)
}

function FileRepair({ data }: { readonly data: Interface[] }) {
	const moneyHistoryService = new MoneyHistoryService();
	const dispatch = useAppDispatch();


	const handleDelete = async (_id: string) => {
		const result = await Swal.fire({
			title: `¿Estás seguro de eliminar ${data?.find(h => h._id === _id)?.name}?`,
			text: 'Esta acción no se puede deshacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'No, cancelar',
		})

		if (!result?.isConfirmed) return;

		const response = await moneyHistoryService.delete(_id);
		if (response) dispatch(ACTIONS.delete({ _id }));
	}


	return (

		<Accordion defaultActiveKey="0" style={{ maxWidth: '400px' }} alwaysOpen>
			<Accordion.Item eventKey="0">
				<Accordion.Header>Finanzas {(new Date(data[0]?.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }))}</Accordion.Header>
				<Accordion.Body style={{ padding: '0rem' }}>

					<Table striped hover style={{ width: '400px' }}>
						<thead>
							<tr>
								<th style={{ width: '75px' }}></th>
								<th>nombre</th>
								<th style={{ width: '100px' }} >monto</th>
								<th style={{ width: '40px' }}>estado</th>
							</tr>
						</thead>
						<tbody>
							{data?.map(r => <MoneyComponent key={r?._id} r={r} handleDelete={handleDelete} />)}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">

				<Accordion.Header>calculos</Accordion.Header>
				<Accordion.Body style={{ padding: '0rem' }}>
					<Table hover bordered style={{ maxWidth: '400px' }}>
						<tbody>
							<tr>
								<td rowSpan={2}>Egresos</td>
								<td> no pagados: </td>
								<td colSpan={2}> {MoneyFormatter(data?.filter(h => h.status === 'pending' && !h.income).reduce((acum, h) => acum + h.amount, 0))} </td>
							</tr>

							<tr>
								<td> pagados: </td>
								<td colSpan={2}> {MoneyFormatter(data?.filter(h => h.status === 'done' && !h.income).reduce((acum, h) => acum + h.amount, 0))} </td>
							</tr>


							<tr>
								<td rowSpan={2}>Ingresos</td>
								<td> no recibidos: </td>
								<td colSpan={2}> {MoneyFormatter(data?.filter(h => h.status === 'pending' && h.income).reduce((acum, h) => acum + h.amount, 0))} </td>
							</tr>

							<tr>
								<td> recibidos: </td>
								<td colSpan={2}> {MoneyFormatter(data?.filter(h => h.status === 'done' && h.income).reduce((acum, h) => acum + h.amount, 0))} </td>
							</tr>

						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>

	);
}


function MoneyComponent({ r, handleDelete }: { readonly r: Interface; readonly handleDelete: (_id: string) => Promise<void> }) {
	const dispatch = useAppDispatch();
	const moneyHistoryService = new MoneyHistoryService();
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeStatus = async (_id: string, status: 'pending' | 'done') => {
		setIsLoading(true);
		const data = await moneyHistoryService.edit({ _id, status });
		if (data?.status) dispatch(ACTIONS.changeStatus({ _id, status: data?.status }));
		setIsLoading(false);
	}

	return (
		<tr>
			<td>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id={`tooltip-right`}>
							{r.income ? 'Ingreso' : 'Egreso'}
						</Tooltip>
					}
				>
					<div>{r.income ? <GiReceiveMoney color='green' /> : <GiPayMoney color='red' />}</div>
				</OverlayTrigger>
			</td>
			<td>{r.name}</td>
			<td>{MoneyFormatter(r.amount)}</td>
			<td>
				<center className='d-flex justify-content-center align-items-center gap-2'>
					{isLoading && <LoaderV1Component />}
					{!isLoading && <Form.Check type={'checkbox'} onChange={(_e) => handleChangeStatus(r._id, _e?.target?.checked ? 'done' : 'pending')} checked={r.status === 'done'} />}
					<FaDeleteLeft color='red' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => handleDelete(r._id)} />
				</center>
			</td>
		</tr>
	)
}
export default PersonalFinancePage
