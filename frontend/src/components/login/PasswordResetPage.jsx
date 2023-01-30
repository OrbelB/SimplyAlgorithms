import React from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useValidateInput from '../../hooks/use-ValidateInput';
import { changePassword } from '../../services/auth';

export default function PasswordResetPage() {
  const [token] = useSearchParams();
  const dispatch = useDispatch();
  const {
    value: password,
    hasError: passwordHasError,
    valueIsValid: passwordIsValid,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    reset: passwordReset,
  } = useValidateInput((value) => value.trim() !== '');

  const {
    value: rePassword,
    hasError: rePasswordHasError,
    valueIsValid: rePasswordIsValid,
    inputBlurHandler: rePasswordBlurHandler,
    valueChangeHandler: rePasswordChangeHandler,
    reset: rePasswordReset,
  } = useValidateInput((value) => value.trim() !== '');

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    }
    return false;
  };
  const resetPassword = () => {
    validate(password);
    console.log(token.get('token'));
    dispatch(
      changePassword({
        newPassword: password,
        passwordToken: token.get('token'),
      })
    );
    rePasswordReset();
    passwordReset();
  };

  const strongPass = validate(password);
  const passwordMatches =
    password === rePassword && passwordIsValid && rePasswordIsValid;

  let isFormValid = false;
  if (passwordIsValid && rePasswordIsValid && passwordMatches && strongPass)
    isFormValid = true;

  return (
    <div className="container pt-5">
      <form onSubmit={resetPassword}>
        <div className="row pt-5">
          <div className="col-sm-4" />
          <div className="col-sm-4 form-outline">
            <input
              type="password"
              id="resetPassword"
              className="form-control form-control-lg"
              value={password}
              autoComplete="new-password"
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
              required
            />
            {/* <label className="form-label-1" htmlFor="resetPassword"> */}
            Password
            {/* </label> */}
          </div>
          {passwordHasError && (
            <div className="col col-sm-auto small m-2 p-0">
              <span className="alert alert-danger small p-2">
                Password is empty
              </span>
            </div>
          )}
          {!passwordMatches && passwordIsValid && rePasswordIsValid && (
            <div className="col col-sm-auto small m-2 p-0">
              <span className="alert alert-danger small p-2">
                Passwords do not match
              </span>
            </div>
          )}
          {!strongPass && passwordIsValid && (
            <div className="col col-sm-auto small m-2 p-0">
              <span className="alert alert-danger small p-2">
                Password not strong
              </span>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-sm-4" />
          <div className="col-sm-4 form-outline">
            <input
              type="password"
              id="form3Example4cdg"
              className="form-control form-control-lg"
              autoComplete="new-password"
              value={rePassword}
              onBlur={rePasswordBlurHandler}
              onChange={rePasswordChangeHandler}
              required
            />
            {/* <label className="form-label-1" htmlFor="resetPassword"> */}
            Repeat your password
            {/* </label> */}
          </div>
          {rePasswordHasError && (
            <div className="col col-sm-auto small m-2 p-0">
              <span className="alert alert-danger small p-2">
                Password is empty
              </span>
            </div>
          )}
          {!passwordMatches && passwordIsValid && rePasswordIsValid && (
            <div className="col col-sm-auto small m-2 p-0">
              <span className="alert alert-danger small p-2">
                Passwords do not match
              </span>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-success btn-block btn-sm gradient-custom-4 text-body"
              onClick={resetPassword}
              disabled={!isFormValid}
            >
              reset password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
// git makes me want to blow my brain out
