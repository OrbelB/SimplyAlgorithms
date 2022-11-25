import Modal from "react-bootstrap/Modal";
import { Container, Row } from "react-bootstrap";
import useValidateInput from "../../hooks/use-ValidateInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/auth";
import { imageToStringBase64 } from "../../utilities/image-to-data-url";
export default function SignUp({ showSignup, handleOnClose }) {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [image, setImage] = useState(undefined);
  const [dob, setDob] = useState("");
  const [submitPostRegister, setSubmitPostRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (status === "success") {
    handleOnClose(!showSignup);
  }

  const {
    value: username,
    hasError: usernameHasError,
    valueIsValid: usernameIsValid,
    inputBlurHandler: usernameBlurHandler,
    valueChangeHandler: usernameChangeHandler,
    reset: usernameReset,
  } = useValidateInput((value) => value.trim() !== "");
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
  } = useValidateInput((value) => value.trim() !== "");

  const {
    value: rePassword,
    hasError: rePasswordHasError,
    valueIsValid: rePasswordIsValid,
    inputBlurHandler: rePasswordBlurHandler,
    valueChangeHandler: rePasswordChangeHandler,
    reset: rePasswordReset,
  } = useValidateInput((value) => value.trim() !== "");

  const handleClose = () => {
    handleOnClose(!showSignup);
  };

  const registerUserInfo = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch(
      register({
        lastName,
        firstName,
        username,
        password,
        email,
        dob,
        profilePicture: imageToStringBase64(image),
      })
    );
    emailReset();
    usernameReset();
    rePasswordReset();
    passwordReset();
    setImage(undefined);
    setDob("");
    setFirstName("");
    setLastName("");
    setSubmitPostRegister(!submitPostRegister);
  };

  let passwordMatches =
    password === rePassword && passwordIsValid && rePasswordIsValid;
  let isFormValid = false;
  if (
    usernameIsValid &&
    passwordIsValid &&
    rePasswordIsValid &&
    emailIsValid &&
    passwordMatches
  )
    isFormValid = true;

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
  return (
    <>
      <Modal
        show={showSignup}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id={"contained-modal-title-vcenter"}>
            <h2 className="text-uppercase text-center">Create an account</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <form onSubmit={registerUserInfo}>
              <div className={"row"}>
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
                    onBlur={usernameBlurHandler}
                  />
                  <label className="form-label" htmlFor="formLastName">
                    last name
                  </label>
                </div>
              </div>
              <div className={"row"}>
                <div className="col form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1cg"
                    className="form-control form-control-lg"
                    value={username}
                    required
                    onChange={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                  />
                  <label className="form-label" htmlFor="form3Example1cg">
                    username
                  </label>
                </div>
                {usernameHasError && (
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
                      Username is empty{" "}
                    </span>
                  </div>
                )}
              </div>
              <div className={"row"}>
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
                  <label className="form-label" htmlFor="form3Example3cg">
                    Email
                  </label>
                </div>
                {emailHasError && (
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
                      Email must be valid
                    </span>
                  </div>
                )}
              </div>
              <div className={"row"}>
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
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
                      Password is empty
                    </span>
                  </div>
                )}
                {!passwordMatches && passwordIsValid && rePasswordIsValid && (
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
                      Passwords do not match
                    </span>
                  </div>
                )}
              </div>
              <div className={"row"}>
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
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
                      Password is empty
                    </span>
                  </div>
                )}
                {!passwordMatches && passwordIsValid && rePasswordIsValid && (
                  <div className={"col col-sm-auto small m-2 p-0"}>
                    <span className={"alert alert-danger small p-2"}>
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
                {image && <img src={URL.createObjectURL(image)} />}
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
        <Modal.Footer className={"justify-content-center"}>
          <Row content={"center"}>
            <p className="text-center text-muted ">
              Have already an account?{" "}
              <i role={"button"} variant="secondary" onClick={handleClose}>
                Login here
              </i>
            </p>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}
