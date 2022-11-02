import cx from "classnames";
import styles from "./LoginForm.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useValidateInput from "../../hooks/use-ValidateInput.js";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/reducers/auth-reducer";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import { login } from "../../services/auth";
import { statusActions } from "../../store/reducers/httpStatus-reducer";
export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [handleCheckbox, setHandleCheckbox] = useState(false);
  const [submitApiRequest, setSubmitApiEndpoint] = useState(false);
  const statusCode = useSelector(state=> state.http.statusCode);
  const jwtRefreshToken = useSelector((state) => state.auth.jwtRefreshToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    sendRequest,
    status,
    data: contentData,
    error,
  } = useHttp(login, false);

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
  };

  const handleCheckBoxChange = (event) => {
    setHandleCheckbox(event.target.checked);
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    setSubmitApiEndpoint(true);
  };

  useEffect(() => {
    if (submitApiRequest) {
      sendRequest({ username, password });
      setSubmitApiEndpoint(false);
      resetPasswordHandler();
      resetUsernameHandler();
    }
  }, [sendRequest, submitApiRequest, handleCheckbox]);

  if (status === "success") {
    dispatch(
      authActions.setVals({
        jwtAccessToken: contentData?.accessToken,
        jwtRefreshToken: contentData?.refreshToken,
        userId: contentData?.userId
      })
      
    );
    dispatch(authActions.setIsLoggedIn());
    if (handleCheckbox) {
      document.cookie = `refresh_token=${jwtRefreshToken}`;
    }
    if(statusCode === 200){
      navigate("/home", {
        replace: true,
      });
      dispatch(statusActions.resetData({}));
    }
    
  }

  let isFormValid = false;
  if (passwordIsValid && usernameIsValid) isFormValid = true;
  return (
    <>
      {error !== null && (
        <div className={"col ms-0 p-0 alert alert-danger align-content-center"}>
          <p className={"text-center small"}>credentials are wrong!</p>
        </div>
      )}
      <form onSubmit={onSubmitFormHandler}>
        <div className={"row mt-5 m-0"}>
          <div className={"col m-0 p-0"}>
            <label
              className={"form-label m-0 mb-2 p-0"}
              htmlFor={"username-form"}
            >
              Username
            </label>
          </div>
          {usernameInputHasError && (
            <div
              className={"col ms-0 p-0 alert alert-danger align-content-center"}
            >
              <p className={"text-center small"}>username cannot be empty!</p>
            </div>
          )}
        </div>
        <div
          className={cx(
            "row border border-2 rounded-5",
            styles[`row-input-style${!usernameInputHasError ? "" : "-invalid"}`]
          )}
        >
          <input
            type={"username"}
            id={"username-form"}
            placeholder={"username"}
            className={cx("p-auto", styles["input-style"])}
            onChange={usernameChangedHandler}
            onBlur={usernameBlurHandler}
            value={username}
            required={true}
          />
        </div>
        <div className={"row mt-5 m-0"}>
          <div className={"col m-0 p-0"}>
            <label
              className={"form-label m-0 mb-2 p-0"}
              htmlFor={"password-form"}
            >
              Password
            </label>
          </div>
          {passwordInputHasError && (
            <div
              className={"col ms-0 p-0 alert alert-danger align-content-center"}
            >
              <p className={"text-center small"}>password cannot be empty!</p>
            </div>
          )}
        </div>
        <div
          className={cx(
            "row justify-content-between border border-2 rounded-5",
            styles[`row-input-style${!passwordInputHasError ? "" : "-invalid"}`]
          )}
        >
          <div
            className={
              "col-auto col-sm-10 col-md-10 col-lg-10 col-sm-auto align-self-center"
            }
          >
            <input
              autoComplete={"off"}
              type={isPasswordVisible ? "text" : "password"}
              id={"password-form"}
              placeholder={"*******"}
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              value={password}
              className={cx("p-auto", styles["input-style"])}
              required={true}
            />
          </div>
          <div
            className={"col-auto col-sm-auto align-self-center me-auto me-lg-2"}
          >
            <i
              role={"button"}
              className={cx(
                `bi bi-eye${isPasswordVisible ? "" : "-slash"}`,
                styles["password-visible-style"]
              )}
              onClick={handlePasswordVisibility}
            ></i>
          </div>
        </div>
        <div
          className={
            "row justify-content-center justify-content-sm-between mt-5"
          }
        >
          <div className="col-auto ">
            <div className="form-check">
              <input
                className="form-check-input rounded-circle"
                type="checkbox"
                id="flexCheckbox"
                onChange={handleCheckBoxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckbox">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-auto align-items-end">
            <NavLink className={"m-sm-auto p-sm-auto"} to="check" role={"link"}>
              Forgot password?
            </NavLink>
          </div>
        </div>
        <div className={"row justify-content-center mt-5"}>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}
