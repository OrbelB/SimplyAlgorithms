import React, { useState } from 'react';
import LoginForm from './LoginForm';
import styles from './Login.module.css';
import SignUp from './SignUp';

export default function Login() {
  const [showSignUp, setShowSingUp] = useState(false);

  const handleShowSingUpModal = () => {
    setShowSingUp(!showSignUp);
  };
  return (
    <>
      {showSignUp && (
        <SignUp showSignUp handleOnClose={handleShowSingUpModal} />
      )}
      <div className="container-fluid">
        <div className="grid p-5 " style={{ minWidth: 350 }}>
          <div className="row justify-content-center">
            <div className="col-auto col-lg-6 align-self-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="m-0 mb-2 p-0">WELCOME BACK!</h2>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="m-0 mb-2 p-0 text-muted">
                  Don&apos;t have an account?{' '}
                  <i
                    role="button"
                    className={styles['text-style']}
                    data-toggle="modal"
                    data-target="#examplemodal"
                    onClick={handleShowSingUpModal}
                    onKeyDown={(e) => {
                      if (e.key === 'start') {
                        handleShowSingUpModal();
                      }
                    }}
                    tabIndex={0}
                  >
                    Sign Up
                  </i>
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
