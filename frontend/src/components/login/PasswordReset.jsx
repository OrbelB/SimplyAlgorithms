// will be a pop up that will ask for user's email.
// will send use the email to send a reset code to the user's provided email

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useValidateInput from '../../hooks/use-ValidateInput';

export default function PasswordReset({ setShowNotification }) {
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    value: email,
    hasError: emailHasError,
    // valueIsValid: emailIsValid,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidateInput((value) => value.trim().match(validEmailRegex));

  const resetPass = (e) => {
    e.preventDefault();
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
          <Modal.Title>Enter email to reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={resetPass}>
            <div className="col form-outline mb-4">
              <input
                type="email"
                id="form3Example3cg"
                className="form-control form-control-lg"
                autoComplete="email"
                value={email}
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
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
          <p>
            If the email adress given exsists it will recieve a reset email from
            no-reply@simplyalgorithms.com
          </p>
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
