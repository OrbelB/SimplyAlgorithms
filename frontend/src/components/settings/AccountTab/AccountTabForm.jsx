import { currentUserInfo } from "../../../pages/UserProfilePage";
import TeacherRequest from "./TeacherRequestForm";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../../services/user";
export default function AccountTabForm({ username1 }) {
  const { username, firstName, lastName, email, phoneNumber, dob } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const [input, setInput] = useState({
    usrname: "",
    firstName: "",
    lastName: "",
    dob: "",
    em: "",
    phone: "",
  });

  const [error, setError] = useState({
    usrname: "",
    firstName: "",
    lastName: "",
    dob: "",
    em: "",
    phone: "",
  });

  const submitForm = () => {
    console.log("check");
    dispatch(
      updateUserData({
        updatedUserData: {
          userId: authUserId,
          username: input?.usrname,
          firstName: input?.firstName,
          lastName: input?.lastName,
          email: input?.email,
          phoneNumber: input?.phone,
          dob: input?.dob,
        },
        accessToken: jwtAccessToken,
      })
    );
    navigate("/userProfile");
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "usrname":
          if (!value) {
            stateObj[name] = "Please enter a new Username.";
          } else if (value === { username }) {
            stateObj[name] = "Can't be same password";
          }
          break;

        case "em":
          if (!value) {
            stateObj[name] = "Please enter a new Email.";
          }
          break;

        case "phone":
          if (!value) {
            stateObj[name] = "Please enter new Phone Number.";
          }
          break;

        case "firstName":
          if (!value) {
            stateObj[name] = "Please enter a new first Name.";
          }
          break;
        case "lastName":
          if (!value) {
            stateObj[name] = "Please enter a new last Name .";
          }
          break;
        case "dob":
          if (!value) {
            stateObj[name] = "Please enter a new dob .";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div>
      <div>
        <form className="mb-2">
          <div className="row">
            <div className="form-group col-md-5">
              <label className="mb-1">First Name</label>
              <div className="row">
                <small className="text-secondary">
                  {" "}
                  Current First Name: {firstName}
                </small>
              </div>
              <input
                type="text"
                className={"form-control"}
                id="firstName"
                value={input.firstName}
                onChange={onInputChange}
                onBlur={validateInput}
              />
            </div>

            <div className="form-group col-md-5">
              <label className="mb-1">Last Name</label>
              <div className="row">
                <small className="text-secondary">
                  {" "}
                  Current Last Name: {lastName}
                </small>
              </div>
              <input
                type="text"
                className={"form-control"}
                id="lastName"
                value={input.lastName}
                onChange={onInputChange}
                onBlur={validateInput}
              />
            </div>
          </div>
          <label className="mt-2" for="username">
            Username
          </label>
          <div className="form-group">
            <small className="text-secondary mb-1">
              {" "}
              Current Username: {username}
            </small>
            <input
              type="text"
              className={"form-control"}
              id="usernameInput"
              name="usrname"
              placeholder="Enter username"
              value={input.usrname}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.usrname && (
              <span className="err text-danger">{error.usrname}</span>
            )}
          </div>

          <label className="mt-2">Birthdate</label>
          <div className="form-group">
            <small className="text-secondary mb-1">
              {" "}
              Current birthdate: {dob}
            </small>
            <input
              type="date"
              className={"form-control"}
              id="dob"
              value={input.dob}
              onChange={onInputChange}
              onBlur={validateInput}
            />
          </div>
          <label className="mt-2" for="emailInput">
            Email
          </label>
          <div className="form-group">
            <small className="text-secondary mb-1">
              {" "}
              Current Email: {email}
            </small>
            <input
              type="text"
              className={"form-control"}
              id="emailInput"
              name="em"
              placeholder="Enter Email"
              value={input.em}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.em && <span className="err text-danger">{error.em}</span>}
          </div>
          <label className="mt-2" for="numberInput">
            Phone Number
          </label>
          <div className="form-group">
            <small className="text-secondary mb-1">
              {" "}
              Current Number: {phoneNumber}
            </small>
            <input
              type="number"
              className={"form-control"}
              id="numberInput"
              name="phone"
              placeholder="Enter phone number"
              value={input.phone}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.phone && (
              <span className="err text-danger">{error.phone}</span>
            )}
          </div>
          <div className="form group mt-2 mb-2">
            <label
              for="usetTypeInput"
              className="col-sm-4 col-md-4 control-label text-right"
            >
              User Type: <br />
            </label>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                checked
              />
              <label class="form-check-label" for="inlineRadio1">
                Student
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                disabled
              />
              <label class="form-check-label" for="inlineRadio2">
                Teacher
              </label>
            </div>
          </div>
          <button type="button" class="btn btn-primary" onClick={submitForm}>
            Confirm
          </button>
          <button type="reset" class="btn btn-light">
            Reset Changes
          </button>
          <hr />
          <TeacherRequest />
          <hr />
          <div class="form-group">
            <label class="d-block text-danger">Delete Account</label>
            <p class="text-muted font-size-sm">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button class="btn btn-danger" type="button">
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}
