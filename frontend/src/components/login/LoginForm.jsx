/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import useValidateInput from '../../hooks/use-ValidateInput';
import { login } from '../../services/auth';
import styles from './LoginForm.module.css';

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
    resetUsernameHandler();
  };

  if (status === 'success') {
    if (handleCheckbox) {
      Cookies.set('refresh-token', jwtRefreshToken, { expires: 7 });
    }
  }
  return (
    <>
      {error !== '' && (
        <div className="col ms-0 p-2 alert alert-danger align-items-center align-content-center">
          <p className="text-center small">credentials are wrong!</p>
        </div>
      )}
      <form onSubmit={onSubmitFormHandler}>
        <div className="row mt-5 m-0">
          <div className="col m-0 p-0">
            <label className="form-label m-0 mb-2 p-0" htmlFor="username-form">
              username
            </label>
          </div>
          {usernameInputHasError && (
            <div className="col ms-0 p-0 alert alert-danger align-content-center">
              <p className="text-center small">username cannot be empty!</p>
            </div>
          )}
        </div>
        <div
          className={cx(
            'row border border-2 rounded-5',
            styles[`row-input-style${!usernameInputHasError ? '' : '-invalid'}`]
          )}
        >
          <input
            type="username"
            id="username-form"
            placeholder="username"
            className={cx('p-auto', styles['input-style'])}
            onChange={usernameChangedHandler}
            onBlur={usernameBlurHandler}
            value={username}
            required
          />
        </div>
        <div className="row mt-5 m-0">
          <div className="col m-0 p-0">
            <label className="form-label m-0 mb-2 p-0" htmlFor="password-form">
              Password
            </label>
          </div>
          {passwordInputHasError && (
            <div className="col ms-0 p-0 alert alert-danger align-content-center">
              <p className="text-center small">password cannot be empty!</p>
            </div>
          )}
        </div>
        <div
          className={cx(
            'row justify-content-between border border-2 rounded-5',
            styles[`row-input-style${!passwordInputHasError ? '' : '-invalid'}`]
          )}
        >
          <div className="col-auto col-sm-10 col-md-10 col-lg-10 col-sm-auto align-self-center">
            <input
              autoComplete="off"
              type={isPasswordVisible ? 'text' : 'password'}
              id="password-form"
              placeholder="*******"
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              value={password}
              className={cx('p-auto', styles['input-style'])}
              required
            />
          </div>
          <div className="col-auto col-sm-auto align-self-center me-auto me-lg-2">
            <i
              role="button"
              className={cx(
                `bi bi-eye${isPasswordVisible ? '' : '-slash'}`,
                styles['password-visible-style']
              )}
              onClick={handlePasswordVisibility}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'start') {
                  handlePasswordVisibility();
                }
              }}
            />
          </div>
        </div>
        <div className="row justify-content-center justify-content-sm-between mt-5">
          <div className="col-auto ">
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
          <div className="col-auto align-items-end">
            <NavLink className="m-sm-auto p-sm-auto" to="check" role="link">
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}
