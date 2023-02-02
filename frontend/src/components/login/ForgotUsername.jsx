/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import useValidateInput from '../../hooks/use-ValidateInput';
import { getUsername } from '../../services/auth';

export default function ForgotUsername() {
  const dispatch = useDispatch();
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    value: email,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput((value) => value.trim().match(validEmailRegex));

  const getUsernameCall = (e) => {
    e.preventDefault();
    dispatch(getUsername(email));
    setShow(false);
  };

  return (
    <>
      <Button variant="btn btn-light" onClick={handleShow}>
        Forgot username
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If a username is tied to the email inputed then you will receive an
            email with your username
          </p>
          <form onSubmit={getUsernameCall}>
            <div className="col form-outline mb-4">
              <input
                type="email"
                id="email-form"
                className="form-control form-control-lg"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={email}
                required
              />
            </div>
            {emailHasError && (
              <div className="col col-sm-auto small m-2 p-0">
                <span className="alert alert-danger small p-2">
                  Email must be valid
                </span>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={getUsernameCall}>
            get username
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
