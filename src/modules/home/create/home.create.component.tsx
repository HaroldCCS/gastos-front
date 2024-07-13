import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TbHomePlus } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

import { useAppDispatch } from "../../../store";
import ACTIONS from "../../../store/home/home.action";

function HomeCreateComponent() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const handleCreate = () => {
    dispatch(ACTIONS.add({ _id: Math.random().toString(), name }));
    setShow(false);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Crear un hogar <TbHomePlus />
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
          <Modal.Title>Gestina las finanzas de un nuevo hogar</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-4 pb-4">

          <p className="mb-2">Nombre del hogar:</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><IoMdHome /></InputGroup.Text>
            <Form.Control
              placeholder="Nombre"
              aria-label="name"
              aria-describedby="nombre del hogar"
              onChange={e => setName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear hogar
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default HomeCreateComponent;