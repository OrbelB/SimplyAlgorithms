import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPopup({
  messageHeader,
  messageBody,
  messageFooter,
  setShowNotification,
  routePage,
  goToPage,
  reloadPage,
}) {
  const navigation = useNavigate();

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShowNotification(true);
    setShow(false);
    if (routePage) {
      navigation(goToPage);
    }
    if (reloadPage) {
      window.location.reload();
    }
  };
  // const handleShow = () => setShow(true);
  // eslint-disable-next-line prettier/prettier
  // console.log(show, ' COMFIRM POPUP');
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{messageHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{messageBody}</Modal.Body>
      <Modal.Footer>
        {messageFooter}
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
