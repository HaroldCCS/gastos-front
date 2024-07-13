import React, { useEffect } from "react";

import { Table } from "react-bootstrap";

import MoneyFormatter from "../../../utility/MoneyFormatter";

import styles from './index.module.scss'

interface IRepair {
  _id: string,
  incremental: number,
  name: string,
  price: number
  paid: number
}


function HomeRepairsComponent() {
  const [repairs, setRepairs] = React.useState<IRepair[]>([]);

  useEffect(() => {
    setRepairs([
      { _id: '1', incremental: 1, name: 'Baño', price: 100_000_000, paid: 50_000_000 },
      { _id: '2', incremental: 2, name: 'Tejado', price: 160_000, paid: 70_000 },
    ])
  }, []);


  return (
    <div className={styles.main + ' pt-3 pb-3'} >
      <h3 className="d-flex justify-content-center" >Reparaciones</h3>
      <FileRepair data={repairs} />
    </div>
  );
}

function FileRepair({ data }: { readonly data: IRepair[] }) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>nombre</th>
          <th style={{width: '230px'}} >recaudado</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(r => (<tr key={r?._id}>
          <td>{r.name}</td>
          <td>{MoneyFormatter(r.paid)} / {MoneyFormatter(r.price)}</td>
        </tr>))}
      </tbody>
    </Table>
  );
}


export default HomeRepairsComponent;