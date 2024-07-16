import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TbHomePlus } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { IoCalendarNumberSharp } from "react-icons/io5";

import { useAppDispatch } from "store";
import ACTIONS from "store/personalFinance/myMoneyHistory/myMoneyHistory.action";
import MoneyHistoryService from "services/myMoneyHistory/moneyHistory.service";
import LoaderGoogleComponent from '../../../../components/loaders/loaderV2/loaderGoogle.component';

function MyMoneyHistoryCreateComponent() {
  const moneyHistoryService = new MoneyHistoryService();

  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(false);
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [isLoading, setIsLoading] = useState(false);


  const handleCreate = async () => {
    setIsLoading(true);
    const response = await moneyHistoryService.create({ name, status: status ? 'done' : 'pending', date: date, amount, income });
    if (response?._id) {
      dispatch(ACTIONS.add(response));
      setShow(false);
    }
    setIsLoading(false);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setAmount(Number(value));
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-CO')}`;
  };


  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Agregar dinero <TbHomePlus />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >

        <Modal.Header closeButton>
          <Modal.Title>TO DO</Modal.Title>
        </Modal.Header>

        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pt-4 pb-4">

            <p className="mb-2">Nombre del ingreso/egreso:</p>

            <InputGroup className="mb-3">
              <Form.Check inline type="switch" id="basic-addon45" checked={income} label="Es un ingreso" name="group1" onChange={e => setIncome(e.target.checked)}></Form.Check>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><IoMdHome /></InputGroup.Text>
              <Form.Control
                placeholder="Nombre"
                aria-label="name"
                aria-describedby="nombre"
                onChange={e => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><IoMdHome /></InputGroup.Text>
              <Form.Control
                placeholder="Cantidad"
                aria-label="Cantidad"
                aria-describedby="Cantidad"
                onChange={handleChangeAmount}
                value={amount !== null ? amount : ''}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Checkbox id="basic-addon1" checked={status} onChange={e => setStatus(e.target.checked)}></InputGroup.Checkbox>
              <Form.Control
                disabled
                placeholder={` ${income ? "¿ya fue recibido?" : "¿ya se pagó?"}`}
                aria-label="Estado"
                aria-describedby="Estado"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"> <IoCalendarNumberSharp /> </InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Fecha"
                aria-label="Fecha"
                aria-describedby="Fecha"
                defaultValue={(new Date()).toISOString().split('T')[0]}
                onChange={e => { setDate(new Date(e.target.value)) }}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              cancelar
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Crear {income ? 'ingreso' : 'egreso'}
            </Button>
          </Modal.Footer>
        </>}
      </Modal>
    </>
  );
}

export default MyMoneyHistoryCreateComponent;