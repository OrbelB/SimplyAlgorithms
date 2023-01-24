// will be a pop up that will ask for user's username.
// will send the email to send a reset token to the user's provided email

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import useValidateInput from '../../hooks/use-ValidateInput';
import { resetPasswordRequest } from '../../services/auth';

export default function PasswordReset({ setShowNotification }) {
  const dispatch = useDispatch();
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    value: username,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useValidateInput((value) => value.trim().match(validEmailRegex));

  const resetPass = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(username));
    setShow(false);
    setShowNotification(true);
    // console.log('reseting password for this email: ', email);
  };

  return (
    <>
      <Button variant="btn btn-light" onClick={handleShow}>
        Reset Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter username to reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If the username exists you will receive an email to reset the
            password, the email used will be the one tied to the user name
          </p>
          <form onSubmit={resetPass}>
            <div className="col form-outline mb-4">
              <input
                type="username"
                id="username-form"
                className="form-control form-control-lg"
                onChange={usernameChangedHandler}
                onBlur={usernameBlurHandler}
                value={username}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={resetPass}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
