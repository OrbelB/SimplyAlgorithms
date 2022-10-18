import Modal from 'react-bootstrap/Modal';
import {Container, Row} from "react-bootstrap";
import useValidateInput from "../../hooks/use-ValidateInput";

export default function SignUp({showSignup, handleOnClose}) {
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const {
        value: username,
        hasError: usernameHasError,
        valueIsValid: usernameIsValid,
        inputBlurHandler: usernameBlurHandler,
        valueChangeHandler: usernameChangeHandler,
        reset: usernameReset
    } = useValidateInput((value) => value.trim() !== "");

    const {

        value: email,
        hasError: emailHasError,
        valueIsValid: emailIsValid,
        inputBlurHandler: emailBlurHandler,
        valueChangeHandler: emailChangeHandler,
        reset: emailReset
    } = useValidateInput((value) => value.trim().match(validEmailRegex));

    const {
        value: password,
        hasError: passwordHasError,
        valueIsValid: passwordIsValid,
        inputBlurHandler: passwordBlurHandler,
        valueChangeHandler: passwordChangeHandler,
        reset: passwordReset
    } = useValidateInput((value) => value.trim() !== "");

    const {
        value: rePassword,
        hasError: rePasswordHasError,
        valueIsValid: rePasswordIsValid,
        inputBlurHandler: rePasswordBlurHandler,
        valueChangeHandler: rePasswordChangeHandler,
        reset: rePasswordReset
    } = useValidateInput((value) => value.trim() !== "");

    const handleClose = () => {
        handleOnClose(!showSignup);
    }

    const registerUserInfo = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        emailReset();
        usernameReset();
        rePasswordReset();
        passwordReset();
        handleOnClose(!showSignup);
    }

    let passwordMatches = password === rePassword && passwordIsValid && rePasswordIsValid;
    let isFormValid = false;
    if (usernameIsValid && passwordIsValid && rePasswordIsValid && emailIsValid && passwordMatches) isFormValid = true;

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
                                    <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                                           value={username} required onChange={usernameChangeHandler}
                                           onBlur={usernameBlurHandler}/>
                                    <label className="form-label" htmlFor="form3Example1cg">username</label>
                                </div>
                                {usernameHasError && <div className={"col col-sm-auto small m-2 p-0"}><span
                                    className={"alert alert-danger small p-2"}>Username is empty </span></div>}
                            </div>
                            <div className={"row"}>
                                <div className="col form-outline mb-4">
                                    <input type="email" id="form3Example3cg" className="form-control form-control-lg"
                                           value={email} onBlur={emailBlurHandler} onChange={emailChangeHandler}
                                           required/>
                                    <label className="form-label" htmlFor="form3Example3cg">Email</label>
                                </div>
                                {emailHasError && <div className={"col col-sm-auto small m-2 p-0"}><span
                                    className={"alert alert-danger small p-2"}>Email must be valid</span></div>}
                            </div>
                            <div className={"row"}>
                                <div className="col form-outline mb-4">
                                    <input type="password" id="form3Example4cg" className="form-control form-control-lg"
                                           value={password} onBlur={passwordBlurHandler}
                                           onChange={passwordChangeHandler} required/>
                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                </div>
                                {passwordHasError &&
                                    <div className={"col col-sm-auto small m-2 p-0"}><span
                                        className={"alert alert-danger small p-2"}>Password is empty</span></div>}
                                {!passwordMatches && passwordIsValid && rePasswordIsValid &&
                                    <div className={"col col-sm-auto small m-2 p-0"}><span
                                        className={"alert alert-danger small p-2"}>Passwords do not match</span></div>}
                            </div>
                            <div className={"row"}>
                                <div className="col form-outline mb-4">
                                    <input type="password" id="form3Example4cdg"
                                           className="form-control form-control-lg"
                                           value={rePassword} onBlur={rePasswordBlurHandler}
                                           onChange={rePasswordChangeHandler} required/>
                                    <label className="form-label" htmlFor="form3Example4cdg">Repeat your
                                        password</label>
                                </div>
                                {rePasswordHasError &&
                                    <div className={"col col-sm-auto small m-2 p-0"}><span
                                        className={"alert alert-danger small p-2"}>Password is empty</span></div>}
                                {!passwordMatches && passwordIsValid && rePasswordIsValid &&
                                    <div className={"col col-sm-auto small m-2 p-0"}><span
                                        className={"alert alert-danger small p-2"}>Passwords do not match</span></div>}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button"
                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                        onClick={registerUserInfo} disabled={!isFormValid}>Register
                                </button>
                            </div>
                        </form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Row content={"center"}>
                        <p className="text-center text-muted ">Have already an account? <i role={"button"}
                                                                                          variant="secondary"
                                                                                          onClick={handleClose}>Login
                            here</i>
                        </p>
                    </Row>
                    <Row>
                        <div className={"me-5"}></div>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );

}