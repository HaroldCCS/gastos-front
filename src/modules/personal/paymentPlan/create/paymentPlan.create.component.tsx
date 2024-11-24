import React, { useState } from "react";
import { Fade } from 'react-awesome-reveal';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TbHomePlus, TbZoomMoney } from "react-icons/tb";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import { useAppDispatch } from "store";
import ACTIONS from "store/personalFinance/myMoneyHistory/myMoneyHistory.action";
import LoaderGoogleComponent from '../../../../components/loaders/loaderV2/loaderGoogle.component';
import { Accordion, Card } from "react-bootstrap";
import useCredits from "hooks/useCredits.hook";


function PaymentPlanCreateComponent() {
  const { add } = useCredits({ not_initialized_getAll: true });

  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [interest_rate, setInterestRate] = useState(0);
  const [loan_installments, setLoanInstallments] = useState(0);


  const [isLoading, setIsLoading] = useState(false);


  const handleCreate = async () => {
    setIsLoading(true);
    add({ title, amount, interest_rate, loan_installments, status: 'pending' });
    setShow(false);
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
        Agregar Credito <TbZoomMoney />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        style={{ padding: '0rem !important' }}
      >

        <Modal.Header closeButton>
          <Modal.Title>Crear credito</Modal.Title>
        </Modal.Header>


        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pb-4">

            <Form.Label className="mb-2">Titulo del plan de pagos:</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><MdOutlineDriveFileRenameOutline /> </InputGroup.Text>
              <Form.Control
                placeholder="Nombre"
                aria-label="name"
                aria-describedby="nombre"
                onChange={e => setTitle(e.target.value)}
              />
            </InputGroup>

            <Form.Label className="mb-2">Monto total del credito:</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><AiOutlineDollar /></InputGroup.Text>
              <Form.Control
                placeholder="Cantidad"
                aria-label="Cantidad"
                aria-describedby="Cantidad"
                onChange={handleChangeAmount}
                value={amount !== null ? amount : ''}
              />
            </InputGroup>

            <Form.Label className="mb-2">Porcentaje de intereses:</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><AiOutlineDollar /></InputGroup.Text>
              <Form.Control
                placeholder="Intereses"
                aria-label="Intereses"
                aria-describedby="Intereses"
                onChange={_e => setInterestRate(Number(_e.target.value))}
                value={interest_rate !== null ? interest_rate : ''}
              />
            </InputGroup>

            <Form.Label className="mb-2">Cantidad de cuotas:</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><AiOutlineDollar /></InputGroup.Text>
              <Form.Control
                placeholder="Intereses"
                aria-label="Intereses"
                aria-describedby="Intereses"
                onChange={_e => setLoanInstallments(Number(_e.target.value))}
                value={loan_installments !== null ? loan_installments : ''}
              />
            </InputGroup>

            <hr />

            <Form.Label className="mb-2">Valor total con intereses: {formatCurrency(amount * (interest_rate + 100) / 100)}</Form.Label>


          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              cancelar
            </Button>
            <Button variant="primary" disabled={!amount || !loan_installments} onClick={handleCreate}>
              Crear
            </Button>
          </Modal.Footer>
        </>}
      </Modal>
    </>
  );
}

export default PaymentPlanCreateComponent;