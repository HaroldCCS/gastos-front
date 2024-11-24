import React, { useEffect } from 'react'
import HeaderTurnBackComponent from "components/header_turn_back/header_turn_back.component";

import { Fade } from 'react-awesome-reveal';
import { useAppSelector } from 'store';

import styles from './index.module.scss';
import PaymentPlanCreateComponent from 'modules/personal/paymentPlan/create/paymentPlan.create.component';
import MoneyFormatter from 'utility/MoneyFormatter';

interface Interface {
	_id: string,
	title: string,
	amount: number,
	status: 'pending' | 'done',
	interest_rate: number,
	loan_installments: number,
	loan_installments_paid: number,
	user?: string
}


const CreditPage: React.FC = () => {
	const storage = useAppSelector(state => state.credit.credit);


	return (
		<div className={styles.main}>
			<Fade direction='down'>
				<HeaderTurnBackComponent title="Gestión de créditos" />
			</Fade>

			<div className='d-flex justify-content-end gap-5 mt-5 flex-wrap'>
				<PaymentPlanCreateComponent />
			</div>


			<div className='d-flex justify-content-center gap-5 mt-5 flex-wrap'>
				{storage.map((data) => (
					<DataComponent key={data._id} data={data} />
				))}

			</div>
		</div>
	)
}

const DataComponent = ({ data }: { readonly data: Interface }) => {

	const status_name = {
		pending: 'en proceso',
		done: 'pagado',
	}
	return (
		<div className={`${styles.data_component}`}>
			<div className={styles.fluid_container}></div>
			<h3>{data.title}</h3>
			<div className={styles.money_container}>
				<p className={styles.money} >{MoneyFormatter(data.amount)}</p>
				<p className={styles.interest_rate} >{data.interest_rate}%</p>
			</div>

			<div className={`${styles.loan_installments} ${ data.loan_installments_paid == data?.loan_installments ? styles.loan_finished : ''}`} >{data.loan_installments_paid}/{data.loan_installments}</div>
			<p className={styles.status} >{status_name[data.status]}</p>
		</div>
	)
}

export default CreditPage
