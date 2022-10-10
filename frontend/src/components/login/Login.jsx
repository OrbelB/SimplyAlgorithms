import image from "../../assets/Screenshot 2022-10-09 190501.png";
import {NavLink} from "react-router-dom";

export default function Login() {


    return (
        <div className={"container-fluid bg-white"}>
            <div className={"grid ms-5 me-5 p-5"}>
                <div className={"row"}>
                    <div className={"col-5 align-self-center col-lg-5 col-sm-auto"}>
                        <div className={"row justify-content-start"}>
                            <h2 className={"m-0  mb-3 p-0"}>
                                WELCOME BACK!
                            </h2>
                        </div>
                        <div className={"row justify-content-start"}>
                            <p className={"m-0 mb-2 p-0"}>
                                Don't have an account, <NavLink to={"signup"}>Sign up</NavLink>
                            </p>
                        </div>
                        <form>
                            <div className={"row mt-5"}>
                                <label className={"form-label m-0 mb-2 p-0"} htmlFor={"username-form"}>Username</label>
                                <input type={"username"} id={"username-form"} placeholder={"username"}
                                       className={"form-control"}/>
                            </div>
                            <div className={"row mt-5"}>
                                <label className={"form-label m-0 mb-2 p-0"} htmlFor={"password-form"}>Password</label>
                                <input type={"password"} id={"password-form"} placeholder={"password"}
                                       className={"form-control"}/>
                            </div>
                            <div className={"row justify-content-between mt-5"}>
                                <div className="col-4 col-sm-auto">
                                    <div className="form-check m-2 p-1">
                                        <input className="form-check-input rounded-circle" type="checkbox" value=""
                                               id="checkbox-form"/>
                                        <label className="form-check-label" htmlFor="checkbox-form"> Remember
                                            me </label>
                                    </div>
                                </div>
                                <div className="col-4  col-sm-auto mt-2">
                                    <NavLink className={"ps-4"} to="check">Forgot password?</NavLink>
                                </div>
                            </div>
                            <div className={"row justify-content-center mt-5"}>
                                <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
                            </div>
                        </form>
                        <div className={"row m-5 p-0 justify-content-around"}>
                            <div
                                className={"col-4 col-md-auto col-lg-3 col-sm-auto border-top border-primary align-self-end mb-2 m-0"}></div>
                            <div className={"col-auto col-md-auto col-lg-auto col-sm-auto align-self-center m-0 p-0"}>
                                or continue with
                            </div>
                            <div
                                className={"col-3 col-md-auto col-lg-3 col-sm-auto border-top border-primary align-self-end mb-2 m-0"}></div>
                        </div>
                        <div className="row m-5  justify-content-around">
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
                        </div>

                    </div>
                    <div className={"col-7 col-lg-7 ms-auto col-sm-auto align-self-start text-center"}>
                        <img
                            src={image}
                            height="90%"
                            width="90%"
                            alt="app logo"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}