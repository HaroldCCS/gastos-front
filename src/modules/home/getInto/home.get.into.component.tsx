import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { TbHomeMove } from "react-icons/tb";

function HomeGetIntoComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Ingresar a un hogar <TbHomeMove />
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
          <Modal.Title>Ingresa a un hogar</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-4 pb-4">
          <p className="mb-2">Ingresa el codigo del hogar</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
            <Form.Control
              placeholder="codigo del hogar"
              aria-label="code"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Solicitar ingreso
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default HomeGetIntoComponent;