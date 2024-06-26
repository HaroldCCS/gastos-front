import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { TbHomePlus } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

function HomeCreateComponent() {
  const [show, setShow] = useState(false);

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
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Crear hogar
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default HomeCreateComponent;