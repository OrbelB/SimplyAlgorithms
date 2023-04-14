/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import useValidateInput from '../../hooks/use-ValidateInput';
import { login } from '../../services/auth';
import PasswordReset from './PasswordReset';
import ConfirmPopup from '../confirmation/ConfirmPopup';
import ForgotUsername from './ForgotUsername';
// function useErrorMessage() {
//   const [errorMessage, setErrorMessage] = useState('');
//   const { status, error } = useSelector((state) => state.auth);

//   if (status === 'failed') {
//     setErrorMessage(error);
//   }

//   switch(errorMessage) {
//     case ''
//   }
//   return errorMessage;
// }

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [handleCheckbox, setHandleCheckbox] = useState(false);
  const { status, error, jwtRefreshToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    value: username,
    hasError: usernameInputHasError,
    valueIsValid: usernameIsValid,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameHandler,
  } = useValidateInput((value) => value.trim() !== '');

  const {
    value: password,
    hasError: passwordInputHasError,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordHandler,
  } = useValidateInput((value) => value.trim() !== '');

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleCheckBoxChange = (event) => {
    setHandleCheckbox(event.target.checked);
  };

  let isFormValid = false;
  if (passwordIsValid && usernameIsValid) isFormValid = true;

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    dispatch(login({ username, password }));
    resetPasswordHandler();
  };

  useEffect(() => {
    if (status === 'success') {
      if (handleCheckbox) {
        Cookies.set('refresh-token', jwtRefreshToken, {
          expires: 7,
          secure: true,
        });
      }
      resetUsernameHandler();
    }
  }, [status, handleCheckbox, jwtRefreshToken, resetUsernameHandler]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const headermes = 'PASSWORD RESET';
  const bodymes =
    'If the username matches a username we will send the user a reset password email, remeber to check the spam folder :)';
  const footermes = '';
  const [showNotification, setShowNotification] = useState(false);
  const routePage = false;
  const goToPage = '';
  const reloadPage = true;

  return (
    <>
      {showNotification && (
        <ConfirmPopup
          messageHeader={headermes}
          messageBody={bodymes}
          messageFooter={footermes}
          setShowNotification={setShowNotification}
          routePage={routePage}
          goToPage={goToPage}
          reloadPage={reloadPage}
        />
      )}
      {status === 'failedLogin' && (
        <div className="col ms-0 p-2 alert alert-danger align-items-center align-content-center">
          <p className="text-center small">{error}</p>
        </div>
      )}
      <form onSubmit={onSubmitFormHandler} className="mt-5 mb-5">
        <div className={cx('row mb-5')}>
          <TextField
            label="Username"
            type="username"
            fullWidth
            name="username"
            helperText={
              usernameInputHasError
                ? 'username cannot be empty!'
                : 'enter your username or email'
            }
            error={usernameInputHasError}
            id="username-form"
            onChange={usernameChangedHandler}
            onBlur={usernameBlurHandler}
            value={username}
            required
          />
        </div>
        <div className={cx('row mb-5')}>
          <TextField
            fullWidth
            error={passwordInputHasError}
            autoComplete="off"
            label="Password"
            id="password-form"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            helperText={
              passwordInputHasError
                ? 'password cannot be empty!'
                : 'Enter your password'
            }
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="row justify-content-center justify-content-sm-between mt-5">
          <div className="col-auto col-md-4">
            <div className="form-check">
              <input
                className="form-check-input rounded-circle"
                type="checkbox"
                id="flexCheckbox"
                onChange={handleCheckBoxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckbox">
                Remember Me
              </label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <button
            type="submit"
            className="btn btn-primary btn-block mb-3"
            style={{ minWidth: 250 }}
          >
            Sign In
          </button>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <PasswordReset setShowNotification={setShowNotification} />
          </div>
          <div className="col-auto">
            <ForgotUsername />
          </div>
        </div>
      </form>
    </>
  );
}
