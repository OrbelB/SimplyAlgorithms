/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TeacherRequest from './TeacherRequestForm';
import AreYouSureModal from '../../AreYourSureModal/AreYouSureModal';
import { updateUserData, deleteAccount } from '../../../services/user';
import { userActions } from '../../../store/reducers/user-slice';
import { authActions } from '../../../store/reducers/auth-slice';

export default function AccountTabForm() {
  const {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    role,
    status,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestSubmmited, setRequestSubmmited] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const [input, setInput] = useState({
    usrname: '',
    firstName: '',
    lastName: '',
    dob: '',
    em: '',
    phone: '',
  });

  const [error, setError] = useState({
    usrname: '',
    firstName: '',
    lastName: '',
    dob: '',
    em: '',
    phone: '',
  });

  useEffect(() => {
    if (requestSubmmited && status === 'success') {
      dispatch(userActions.onUserLogout());
      dispatch(authActions.resetData());
      setRequestSubmmited(false);
      navigate('/home', { replace: true });
    }
  }, [dispatch, navigate, requestSubmmited, status]);
  const submitForm = () => {
    dispatch(
      updateUserData({
        updatedUserData: {
          userId: authUserId,
          firstName: input?.firstName,
          lastName: input?.lastName,
          email: input?.em,
          phoneNumber: input?.phone,
          dob: input?.dob,
        },
        accessToken: jwtAccessToken,
      })
    );
    navigate('/userProfile');
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'usrname':
          if (!value) {
            stateObj[name] = 'Please enter a new Username.';
          } else if (value === { username }) {
            stateObj[name] = "Can't be same password";
          }
          break;

        case 'em':
          if (!value) {
            stateObj[name] = 'Please enter a new Email.';
          }
          break;

        case 'phone':
          if (!value) {
            stateObj[name] = 'Please enter new Phone Number.';
          }
          break;

        case 'firstName':
          if (!value) {
            stateObj[name] = 'Please enter a new first Name.';
          }
          break;
        case 'lastName':
          if (!value) {
            stateObj[name] = 'Please enter a new last Name .';
          }
          break;
        case 'dob':
          if (!value) {
            stateObj[name] = 'Please enter a new dob .';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const submitDeleteAccountRequest = async () => {
    try {
      await dispatch(
        deleteAccount({
          userId: authUserId,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setRequestSubmmited(true);
    }
  };

  return (
    <>
      {showAreYouSureModal && (
        <AreYouSureModal
          open={showAreYouSureModal}
          onClose={() => setShowAreYouSureModal(false)}
          onConfirm={submitDeleteAccountRequest}
          title="Are you sure you want to delete the user account?"
          message="This action cannot be reverted!"
        />
      )}
      <form className="mb-2">
        <div className="row">
          <div className="form-group col-md-6">
            <label className="mb-1 h5">First Name</label>
            <div className="row">
              <strong className="text-secondary">
                {' '}
                Current First Name: {firstName}
              </strong>
            </div>
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstNameInput"
              value={input.firstName}
              onChange={onInputChange}
              onBlur={validateInput}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="mb-1 h5">Last Name</label>
            <div className="row">
              <strong className="text-secondary">
                {' '}
                Current Last Name: {lastName}
              </strong>
            </div>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastNameInput"
              value={input.lastName}
              onChange={onInputChange}
              onBlur={validateInput}
            />
          </div>
        </div>
        <label className="mt-2 h5" htmlFor="username">
          Username
        </label>
        <div className="form-group">
          <strong className="text-secondary mb-1">
            Cannot change your username: {username}
          </strong>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            name="usrname"
            value={username}
            readOnly
          />
          {error.usrname && (
            <span className="err text-danger">{error.usrname}</span>
          )}
        </div>

        <label className="mt-2 h5">Birthdate</label>
        <div className="form-group">
          <strong className="text-secondary mb-1">
            Current birthdate: {dob}
          </strong>
          <input
            type="date"
            name="dob"
            className="form-control"
            id="dobInput"
            value={input.dob}
            onChange={onInputChange}
            onBlur={validateInput}
          />
        </div>
        <label className="mt-2 h5" htmlFor="emailInput">
          Email
        </label>
        <div className="form-group">
          <strong className="text-secondary mb-1">
            Current Email: {email}
          </strong>
          <input
            type="text"
            className="form-control"
            id="emailInput"
            name="em"
            placeholder="Enter Email"
            value={input.em}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {error.em && <span className="err text-danger">{error.em}</span>}
        </div>
        <label className="mt-2 h5" htmlFor="numberInput">
          Phone Number
        </label>
        <div className="form-group">
          <strong className="text-secondary mb-1">
            {' '}
            Current Number: {phoneNumber}
          </strong>
          <input
            type="number"
            className="form-control"
            id="numberInput"
            name="phone"
            placeholder="Enter phone number"
            value={input.phone}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {error.phone && (
            <span className="err text-danger">{error.phone}</span>
          )}
        </div>
        <div className="form group mt-2 mb-2">
          <label
            htmlFor="usetTypeInput"
            className="col-sm-2 col-md-2 control-label h5"
          >
            User Type: <br />
          </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              readOnly
              checked={role === 'STUDENT'}
              disabled={role === 'TEACHER'}
            />
            <label className="form-check-label h6" htmlFor="inlineRadio1">
              Student
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
              readOnly
              checked={role === 'TEACHER'}
              disabled={role === 'STUDENT'}
            />
            <label className="form-check-label h6" htmlFor="inlineRadio2">
              Teacher
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={submitForm}>
          Save
        </button>
        <button type="button" className="btn btn-light">
          Reset Changes
        </button>
        <hr />
        {role === 'STUDENT' && <TeacherRequest />}
        <hr />
        <div className="form-group">
          <label className="d-block text-danger h5">Delete Account</label>
          <p className="text-muted font-size-sm mb-2">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => setShowAreYouSureModal(true)}
        >
          Delete Account
        </button>
      </form>
    </>
  );
}
