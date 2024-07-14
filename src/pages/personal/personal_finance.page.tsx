import React, { useEffect } from 'react'
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



const PersonalFinancePage: React.FC = () => {
	const storage = useAppSelector(state => state.personal_finances.my_money_history);

	const [orderMyMonth, setOrderMyMonth] = React.useState<Map<number, Map<number, Interface[]>>>(new Map());

	useEffect(() => {

		const data = new Map<number, Map<number, Interface[]>>();

		for (const money of storage) {
			const date = new Date(money.date);

			const month = date.getMonth() + 1;
			const year = date.getFullYear();

			if (!data.has(year)) data.set(year, new Map());
			const data_year = data.get(year);

			if (data_year && !data_year?.has(month)) data_year.set(month, []);

			const data_month = data_year?.get(month);
			if (data_month) data_month.push(money);
		}

		setOrderMyMonth(data);
	}, [storage]);

	return (
		<div>
			<Fade direction='down'>
				<HeaderTurnBackComponent title="Sección finanzas personales" />
			</Fade>

			<MyMoneyHistoryCreateComponent />


			<div className='d-flex justify-content-center gap-5 mt-5'>
				{Array.from(orderMyMonth.entries()).map(([key1, value1]) => (
					<div key={key1} className='gap-5 d-flex justify-content-center'>
						{Array.from(value1.entries()).map(([key2, value2]) => (
							<div key={key2} >
								<FileRepair data={value2} />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

function FileRepair({ data }: { readonly data: Interface[] }) {
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
		dispatch(ACTIONS.delete({ _id }))
	}


	return (

		<Accordion defaultActiveKey="0" style={{ width: '400px' }} alwaysOpen>
			<Accordion.Item eventKey="0">
				<Accordion.Header>Finanzas {(new Date(data[0]?.date).toLocaleDateString('es-ES', {year: 'numeric', month: 'long'}))}</Accordion.Header>
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
							{data?.map(r => (<tr key={r?._id}>
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
										<Form.Check type={'checkbox'} onChange={(_e) => dispatch(ACTIONS.changeStatus({ _id: r._id, status: _e?.target?.checked ? 'done' : 'pending' }))} checked={r.status === 'done'} />
										<FaDeleteLeft color='red' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => handleDelete(r._id)} />
									</center>
								</td>
							</tr>))}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">

				<Accordion.Header>calculos</Accordion.Header>
				<Accordion.Body style={{ padding: '0rem' }}>
					<Table hover bordered style={{ width: '400px' }}>
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

export default PersonalFinancePage
