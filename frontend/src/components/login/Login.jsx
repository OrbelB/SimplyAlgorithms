import image from "../../assets/Screenshot 2022-10-09 190501.png";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css"
import cx from "classnames";
import SignUp from "./SignUp";
import React, {useState} from "react";
export default function Login() {
    const [showSignUp, setShowSingUp] = useState(false);

    const handleShowSingUpModal = () => {
        setShowSingUp(!showSignUp);
    }
    return (
        <>
            {showSignUp && <SignUp showSignUp={true} handleOnClose={handleShowSingUpModal}/>}
            <div className={"container-fluid"}>
                <div className={"grid ms-5 me-5 p-5"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-auto col-sm-5 col-lg-5 col-sm-auto align-self-center align-items-center"}>
                            <div className={"d-flex justify-content-center align-items-center"}>
                                <h2 className={"m-0 mb-2 p-0"}>
                                    WELCOME BACK!
                                </h2>
                            </div>
                            <div className={"d-flex justify-content-center align-items-center"}>
                                <p className={"m-0 mb-2 p-0 text-muted"}>
                                    Don't have an account? <i role={"button"} className={styles["text-style"]}
                                                                onClick={handleShowSingUpModal}>Sign Up</i>
                                </p>
                            </div>
                            <LoginForm/>
                            {/* <div className={"row m-3 p-0 justify-content-evenly"}>
                                <div
                                    className={cx("col-auto col-md-4 col-lg-3 col-sm-auto border-top border-primary align-self-end mb-2 m-0", styles["hide-style"])}>
                                </div>
                                <div
                                    className={"col-auto col-md-4 col-lg-auto col-sm-auto align-self-center m-0 p-0"}>
                                    or continue with
                                </div>
                                <div
                                    className={cx("col-auto col-md-4 col-lg-3 col-sm-auto border-top border-primary align-self-end mb-2 m-0",styles["hide-style"])}>
                                </div>
                            </div> */}
                            {/* <div className="row m-1  justify-content-evenly">
                                <div className={"col-4 col-sm-auto"}>
                                    <button className={"btn btn-outline-primary"}>
                                        <i className="bi bi-facebook"></i>
                                    </button>
                                </div>
                                <div className={"col-4 col-sm-auto"}>
                                    <button className={"btn btn-outline-primary"}>
                                        <i className="bi bi-google"></i>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}