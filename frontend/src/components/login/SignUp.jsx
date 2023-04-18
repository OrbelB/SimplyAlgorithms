/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from 'react-bootstrap/Modal';
import { Container, Row } from 'react-bootstrap';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import validator from 'validator';
import useValidateInput from '../../hooks/use-ValidateInput';
import { register } from '../../services/auth';
import imageToStringBase64 from '../../utilities/image-to-data-url';
import { checkAvailability } from '../../services/user';
import useLoginUser from '../../hooks/use-loginuser';

export default function SignUp({ showSignUp, handleOnClose }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [image, setImage] = useState(undefined);
  const [dob, setDob] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const showImage = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const location = useLocation();
  // if there is not a history of prev pages visited returned to home
  const redirectTo = location?.state?.from?.pathname || '/home';
  useLoginUser(redirectTo);

  useEffect(() => {
    if (isLoggedIn && userId) {
      handleOnClose(!showSignUp);
    }
  }, [handleOnClose, isLoggedIn, showSignUp, userId]);

  const { nameAvailable, emailAvailable } = useSelector((state) => state.user);

  const {
    value: username,
    hasError: usernameHasError,
    valueIsValid: usernameIsValid,
    inputBlurHandler: usernameBlurHandler,
    valueChangeHandler: usernameChangeHandler,
    reset: usernameReset,
  } = useValidateInput((value) => value.trim() !== '');
  const {
    value: email,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useValidateInput((value) => value.trim().match(validEmailRegex));

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

  const handleClose = () => {
    handleOnClose(!showSignUp);
  };

  const passwordMatches =
    password === rePassword && passwordIsValid && rePasswordIsValid;

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
  const strongPass = validate(password);
  let isFormValid = false;
  if (passwordIsValid && rePasswordIsValid && passwordMatches && strongPass)
    isFormValid = true;

  if (
    usernameIsValid &&
    passwordIsValid &&
    rePasswordIsValid &&
    emailIsValid &&
    passwordMatches &&
    strongPass &&
    nameAvailable
  )
    isFormValid = true;

  const registerUserInfo = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    let profilePicture;
    await imageToStringBase64(image).then((value) => (profilePicture = value));
    try {
      await dispatch(
        register({
          lastName,
          firstName,
          username,
          password,
          email,
          dob,
          profilePicture,
        })
      ).unwrap();
    } finally {
      emailReset();
      usernameReset();
      rePasswordReset();
      passwordReset();
      setImage(undefined);
      setDob('');
      setFirstName('');
      setLastName('');
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const handleName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleNameExists = async (e) => {
    e.preventDefault();
    const name = e.target.value;
    if (!name || name.trim().length === 0) return;
    dispatch(checkAvailability({ username: name }));
    usernameBlurHandler(name);
  };

  const handleEmailExists = async (e) => {
    e.preventDefault();
    const checkEmail = e.target.value;
    if (!checkEmail || checkEmail.trim().length === 0) return;
    dispatch(checkAvailability({ email: checkEmail }));
    emailBlurHandler(checkEmail);
  };

  return (
    <Modal
      show={showSignUp}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className="text-uppercase text-center">Create an account</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={registerUserInfo}>
            <div className="row">
              <div className="col form-outline mb-4">
                <input
                  type="text"
                  id="formName"
                  className="form-control form-control-lg"
                  value={firstName}
                  autoComplete="name"
                  required
                  onChange={handleName}
                />
                <label className="form-label" htmlFor="formName">
                  name
                </label>
              </div>

              <div className="col form-outline mb-4">
                <input
                  type="text"
                  id="formLastName"
                  className="form-control form-control-lg"
                  value={lastName}
                  autoComplete="lastname"
                  required
                  onChange={handleLastName}
                />
                <label className="form-label" htmlFor="formLastName">
                  last name
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col form-outline mb-4">
                <input
                  type="text"
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  value={username}
                  required
                  onChange={usernameChangeHandler}
                  onBlur={handleNameExists}
                />
                <label className="form-label" htmlFor="form3Example1cg">
                  username
                </label>
              </div>
              {usernameHasError || nameAvailable === false ? (
                <div className="col col-sm-auto small m-2 p-0">
                  <span className="alert alert-danger small p-2">
                    {nameAvailable === false
                      ? 'Username already exists'
                      : 'Username is blank'}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="row">
              <div className="col form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3cg"
                  className="form-control form-control-lg"
                  autoComplete="email"
                  value={email}
                  onBlur={handleEmailExists}
                  onChange={emailChangeHandler}
                  required
                />
                <label className="form-label" htmlFor="form3Example3cg">
                  Email
                </label>
              </div>
              {emailHasError || emailAvailable === false ? (
                <div className="col col-sm-auto small m-2 p-0">
                  <span className="alert alert-danger small p-2">
                    {emailAvailable === false
                      ? 'Email Is Taken'
                      : 'Email must be valid'}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="row">
              <div className="col form-outline mb-4">
                <input
                  type="password"
                  id="form3Example4cg"
                  className="form-control form-control-lg"
                  value={password}
                  autoComplete="new-password"
                  onBlur={passwordBlurHandler}
                  onChange={passwordChangeHandler}
                  required
                />
                <label className="form-label" htmlFor="form3Example4cg">
                  Password
                </label>
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
              <div className="col form-outline mb-4">
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
                <label className="form-label" htmlFor="form3Example4cdg">
                  Repeat your password
                </label>
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
              <div className="col form-outline mb-4">
                <input
                  type="date"
                  id="birthday"
                  className="form-control form-control-lg"
                  value={dob}
                  onChange={handleDob}
                  required
                />
                <label className="form-label" htmlFor="birthday">
                  Enter Your birthdate
                </label>
              </div>
            </div>
            <div className="row">
              {image && <img alt="user's profile" src={showImage} />}
              <div className="col form-outline mb-4">
                <input
                  type="file"
                  id="profilePicture"
                  className="form-control form-control-lg"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImage}
                />
                <label className="form-label" htmlFor="profilePicture">
                  Enter Your profilePicture
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                onClick={registerUserInfo}
                disabled={!isFormValid}
              >
                Register
              </button>
            </div>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Row content="center">
          <p className="text-center text-muted ">
            Have already an account?{' '}
            <i
              role="button"
              variant="secondary"
              onClick={handleClose}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'start') {
                  handleClose();
                }
              }}
            >
              <NavLink to="/login" role="link">
                Login Here
              </NavLink>
            </i>
          </p>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
