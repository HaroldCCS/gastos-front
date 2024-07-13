import React, { useEffect } from 'react'
import HeaderTurnBackComponent from "components/header_turn_back/header_turn_back.component";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

import { Fade } from 'react-awesome-reveal';
import { useAppDispatch, useAppSelector } from 'store';
import { Interface } from 'store/personalFinance/myMoneyHistory';
import { Form, InputGroup, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import MoneyFormatter from 'utility/MoneyFormatter';
import ACTIONS from 'store/personalFinance/myMoneyHistory/myMoneyHistory.action';
import MyMoneyHistoryCreateComponent from 'modules/personal/myMoneyHistory/create/myMoneyHistory.create.component';

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
        console.log(storage)
    }, [storage]);

    return (
        <div>
            <Fade direction='down'>
                <HeaderTurnBackComponent title="Sección finanzas personales" />
            </Fade>

            <MyMoneyHistoryCreateComponent />


            {Array.from(orderMyMonth.entries()).map(([key1, value1]) => (
                <div key={key1} className='mt-5 mb-5'>
                    {Array.from(value1.entries()).map(([key2, value2]) => (
                        <div key={key2} style={{ paddingLeft: '20px' }}>
                            <h3>Finanzas mes {key2} del {key1}</h3>
                            <FileRepair data={value2} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

function FileRepair({ data }: { readonly data: Interface[] }) {
    const dispatch = useAppDispatch();
    return (
        <Table striped hover style={{ width: '400px' }}>
            <thead>
                <tr>
                    <th style={{ width: '75px' }}></th>
                    <th>nombre</th>
                    <th style={{ width: '150px' }} >monto</th>
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
                    <td><center><Form.Check type={'checkbox'} onChange={(_e) => dispatch(ACTIONS.changeStatus({ _id: r._id, status: _e?.target?.checked ? 'done' : 'pending' }))} checked={r.status === 'done'} /></center></td>
                </tr>))}
            </tbody>
        </Table>
    );
}

export default PersonalFinancePage
