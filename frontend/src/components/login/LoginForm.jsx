import cx from "classnames";
import styles from "./LoginForm.module.css";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import useValidateInput from "../../hooks/use-ValidateInput";


export default function LoginForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [handleCheckbox, setHandleCheckbox] = useState(false);

    const {
        value: username,
        hasError: usernameInputHasError,
        valueIsValid: usernameIsValid,
        valueChangeHandler: usernameChangedHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsernameHandler,
    } = useValidateInput((value) => value.trim() !== "");

    const {
        value: password,
        hasError: passwordInputHasError,
        valueIsValid: passwordIsValid,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordHandler,

    } = useValidateInput((value) => value.trim() !== "");

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleCheckBoxChange = () => {
        //TODO send data to server to validate user
        setHandleCheckbox(!handleCheckbox);
    }

    const onSubmitFormHandler = (event) => {
        event.preventDefault();
        if (!isFormValid) return;
        //TODO send data to server before resetting password & username and authenticate users
        resetUsernameHandler();
        resetPasswordHandler();
    }

    let isFormValid = false;
    if (passwordIsValid && usernameIsValid) isFormValid = true;
    return (
        <form onSubmit={onSubmitFormHandler}>
            <div className={"row mt-5 m-0"}>
                <div className={"col m-0 p-0"}>
                    <label className={"form-label m-0 mb-2 p-0"} htmlFor={"username-form"}>Username</label>
                </div>
                {usernameInputHasError && <div className={"col ms-0 p-0 alert alert-danger align-content-center"}>
                    <p className={"text-center"}>username cannot be empty!</p>
                </div>
                }
            </div>
            <div
                className={!usernameInputHasError ? cx("row border border-2 rounded-5", styles["row-input-style"]) :
                    cx("row border border-2 rounded-5", styles["row-input-style-invalid"])}>
                <input type={"username"} id={"username-form"} placeholder={"username"}
                       className={cx("p-auto", styles["input-style"])} onChange={usernameChangedHandler}
                       onBlur={usernameBlurHandler}
                       value={username} required={true}/>
            </div>
            <div className={"row mt-5 m-0"}>
                <div className={"col m-0 p-0"}>
                    <label className={"form-label m-0 mb-2 p-0"} htmlFor={"password-form"}>Password</label>
                </div>
                {passwordInputHasError && <div className={"col ms-0 p-0 alert alert-danger justify-content-center"}>
                    <p className={"text-center"}>password cannot be empty!</p>
                </div>
                }
            </div>
            <div
                className={!passwordInputHasError ? cx("row border border-2 rounded-5", styles["row-input-style"]) :
                    cx("row border border-2 rounded-5", styles["row-input-style-invalid"])}>
                <div className={"col-11 col-md-auto col-lg-10 col-sm-auto me-sm-auto align-self-center"}>
                    <input autoComplete={"off"} type={isPasswordVisible ? "text" : "password"} id={"password-form"}
                           placeholder={"*******"} onChange={passwordChangedHandler} onBlur={passwordBlurHandler}
                           value={password}
                           className={cx("p-auto", styles["input-style"])} required={true}/>
                </div>
                <div className={"col-auto col-sm-auto align-self-center me-lg-2 me-sm-auto"}>
                    {isPasswordVisible ?
                        <i role={"button"} className={cx(" bi bi-eye ")} onClick={handlePasswordVisibility}></i> :
                        <i className={"bi bi-eye-slash"} role={"button"} onClick={handlePasswordVisibility}></i>}
                </div>
            </div>
            <div className={"row justify-content-between mt-5"}>
                <div className="col-4 col-sm-auto p-2">
                    <div className="form-check">
                        <input className="form-check-input rounded-circle" type="checkbox" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="col-4 col-sm-auto">
                    <NavLink className={"m-auto p-auto"} to="check" role={"link"}>Forgot password?</NavLink>
                </div>
            </div>
            <div className={"row justify-content-center mt-5"}>
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign In</button>
            </div>

        </form>
    )
}