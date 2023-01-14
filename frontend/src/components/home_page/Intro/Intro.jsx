import './Intro.css';
// import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import SignUp from '../../login/SignUp';

export default function Intro() {
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const [showSignUp, setShowSingUp] = useState(false);
  function handleShowSingUpModal() {
    setShowSingUp(!showSignUp);
  }
  return (
    <div className="section">
      <div className="container-fluid pb-5">
        <h1 className="row justify-content-center title m-1 m-sm-auto">
          SIMPLY ALGORITHMS
        </h1>
        <p className="row justify-content-center slogan m-1 m-md-auto">
          algorithms made easy
        </p>
        {!isLoggedIn && jwtAccessToken === '' && (
          <div className="row justify-content-center m-1 m-md-auto">
            {/* <NavLink to={"/login"}> */}
            <button
              type="button"
              className="button w-auto"
              onClick={handleShowSingUpModal}
            >
              SIGN UP
            </button>
            {/* </NavLink> */}
          </div>
        )}
      </div>
      {showSignUp && (
        <SignUp showSignUp handleOnClose={handleShowSingUpModal} />
      )}
    </div>
  );
}
