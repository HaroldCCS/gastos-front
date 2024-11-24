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
import MoneyHistoryService from "services/myMoneyHistory/moneyHistory.service";
import LoaderGoogleComponent from '../../../../components/loaders/loaderV2/loaderGoogle.component';
import { Accordion, Card } from "react-bootstrap";


function PaymentPlanCreateComponentV1() {
  const moneyHistoryService = new MoneyHistoryService();

  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [amountFee, setAmountFee] = useState(0);
  const [fees, setFees] = useState(0);
  const [income, setIncome] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [isLoading, setIsLoading] = useState(false);


  const handleCreate = async () => {
    setIsLoading(true);
    // const response = await moneyHistoryService.create({ name, status: 'pending', date: date, amount, income });
    // if (response?._id) {
    //   dispatch(ACTIONS.add(response));
    //   setShow(false);
    // }
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

  const handleChangeFees = (_e_fee?: React.ChangeEvent<HTMLInputElement>, _e_amount?: React.ChangeEvent<HTMLInputElement>) => {

    if (_e_fee) {
      let _fees = 0;
      const value = _e_fee.target.value;
      if (!isNaN(Number(value))) {
        _fees = Number(value);
        setFees(Number(value));
      }

      setAmountFee(Math.ceil(amount / _fees));
    } else if (_e_amount) {
      let fee_amount = 0;
      const value = _e_amount.target.value;
      if (!isNaN(Number(value))) {
        fee_amount = Number(value);
        setAmountFee(Number(value));
      }

      setFees(Math.ceil(amount / fee_amount));
    }

  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-CO')}`;
  };

  console.log('date',date)

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
        size="xl"
        fullscreen
        style={{ padding: '0rem !important' }}
      >

        <Modal.Header closeButton>
          <Modal.Title>Crear un plan de pagos</Modal.Title>
        </Modal.Header>


        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pb-4">
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Información general</Accordion.Header>
                <Accordion.Body >
                  <Form.Label className="mb-2">Escoge:</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Check inline type="switch" id="basic-addon45" checked={income} label="es una deuda o un prestamo" name="group1" onChange={e => setIncome(e.target.checked)}></Form.Check>
                  </InputGroup>

                  <Form.Label className="mb-2">Titulo del plan de pagos:</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><MdOutlineDriveFileRenameOutline /> </InputGroup.Text>
                    <Form.Control
                      placeholder="Nombre"
                      aria-label="name"
                      aria-describedby="nombre"
                      onChange={e => setName(e.target.value)}
                    />
                  </InputGroup>

                  <Form.Label className="mb-2">Monto total {income ? ' del prestamo' : ' de la deuda'}:</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><AiOutlineDollar /> {formatCurrency(amount)}</InputGroup.Text>
                    <Form.Control
                      placeholder="Cantidad"
                      aria-label="Cantidad"
                      aria-describedby="Cantidad"
                      onChange={handleChangeAmount}
                      value={amount !== null ? amount : ''}
                    />
                  </InputGroup>

                  <Form.Label>Seleccionar fecha de inicio de pagos:</Form.Label>
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Personaliza las cuotas</Accordion.Header>
                <Accordion.Body >
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Cantidad de cuotas:</InputGroup.Text>
                    <Form.Control
                      placeholder="Cantidad"
                      aria-label="Cantidad"
                      aria-describedby="Cantidad"
                      onChange={(_e) => handleChangeFees(_e as any, undefined)}
                      value={fees !== null ? fees : ''}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Valor por cuota: {formatCurrency(amountFee)}</InputGroup.Text>
                    <Form.Control
                      placeholder="Cantidad"
                      aria-label="Cantidad"
                      aria-describedby="Cantidad"
                      onChange={(_e) => handleChangeFees(undefined, _e as any)}
                      value={amountFee !== null ? amountFee : ''}
                    />
                  </InputGroup>


                  <div className="d-flex justify-content-start flex-wrap gap-1">
                    <Fade duration={100} cascade>
                      {(amount && fees) ?
                        fees < 48 ?
                          Array.from({ length: fees }, (_, i) => (
                            <Card key={i + 1} style={{ minWidth: '2rem' }} border="info">
                              <Card.Body>
                                <small>
                                  Cuota {i + 1}: {
                                    formatCurrency(
                                      (() => {
                                        const var1 = amountFee * (i + 1);
                                        return var1 < amount ? amountFee : amountFee - (var1 - amount)
                                      })()
                                    )}
                                  <br />
                                  {
                                    (() => {
                                      const fecha = new Date(date)
                                      fecha.setMonth(fecha.getMonth() + i)
                                      console.log(fecha)
                                      return <small>{fecha.toLocaleDateString('es-ES', { day: 'numeric', year: 'numeric', month: 'long' })}</small>
                                    })()
                                  }
                                </small>
                              </Card.Body>
                            </Card>
                          )) : <p>No se puede crear un plan de pagos con más de 48 cuotas</p>
                        : null}
                    </Fade>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              cancelar
            </Button>
            <Button variant="primary" disabled={!amount || !fees} onClick={handleCreate}>
              Crear
            </Button>
          </Modal.Footer>
        </>}
      </Modal>
    </>
  );
}

export default PaymentPlanCreateComponentV1;