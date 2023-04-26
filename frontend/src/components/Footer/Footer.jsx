/* eslint-disable dot-notation */
import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import style from './Footer.module.css';
import image from '../../assets/footer-logo.png';

export default function Footer() {
  return (
    <footer className={cx(style.box)}>
      <div className="row g-0 border-bottom border-top border-dark justify-content-center justify-content-sm-center justify-content-md-between">
        <div className="col-12 col-md-12 g-0 col-lg-3 col-xl-3 mt-4 text-center">
          <img
            className={cx(style['web-logo'], 'ms-4 img-fluid')}
            src={image}
            alt="Simply Algorithms Logo"
            height="200"
            width="200"
            loading="lazy"
          />
        </div>
        <div
          className={cx(
            'col-12 col-md-12 col-lg-3 col-xl-3 pt-4 text-center text-md-left-side fh-100 border-start border-100 border-dark'
          )}
        >
          <h5 className="text-uppercase text-center ms-4">Links</h5>

          <ul className="m-0">
            <li className="pb-2">
              <NavLink
                className={cx(style['nav-footer-link'])}
                aria-current="page"
                to="home"
              >
                Home
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                className={cx(style['nav-footer-link'])}
                aria-current="page"
                to="dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                className={cx(style['nav-footer-link'])}
                aria-current="page"
                to="wiki"
              >
                Wiki
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                className={cx(style['nav-footer-link'])}
                aria-current="page"
                to="forums"
              >
                Forums
              </NavLink>
            </li>
            <li className="pb-2">
              <NavLink
                className={cx(style['nav-footer-link'])}
                aria-current="page"
                to="quiz"
              >
                Quizzes
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className={cx(
            'col-12 col-md-12 col-lg-3 col-xl-3 pt-4 g-0 text-md-left-side text-center fh-100 border-start border-dark'
          )}
        >
          <h5 className="text-uppercase fw-old text-center ms-4">our hubs</h5>
          <ul className="m-0">
            <li className="pb-2">
              <a
                className={cx(style['social-link'])}
                href="https://github.com/OrbelB"
                target="_blank"
                rel="noreferrer"
              >
                Orbel Baghdasian
              </a>
            </li>
            <li className="pb-2">
              <a
                className={cx(style['social-link'])}
                href="https://github.com/PDJefferson"
                target="_blank"
                rel="noreferrer"
              >
                Jefferson Perez Diaz
              </a>
            </li>
            <li className="pb-2">
              <a
                className={cx(style['social-link'])}
                href="https://github.com/floreskevin87"
                target="_blank"
                rel="noreferrer"
              >
                Kevin Flores
              </a>
            </li>
            <li className="pb-2">
              <a
                className={cx(style['social-link'])}
                href="https://github.com/Joey-Codes"
                target="_blank"
                rel="noreferrer"
              >
                Joseph Wang
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-12 col-lg-3 col-xl-3 pt-4 border-start border-dark">
          <div className="row justify-content-center g-0 gy-3 ms-3">
            <h5 className="text-center ">CONTACT US</h5>
            <p className="text-center">
              <span className={cx(style.email)}>algossimply@gmail.com</span>
            </p>
          </div>
          <div className="row justify-content-center text-center gy-3 g-0 ms-3">
            <h5 className="text-center text-uppercase">Meet the Team</h5>
            <div className="mb-3">
              <Button variant="contained">
                <NavLink aria-current="page" to="/team">
                  <div className={cx(style['team-text'])}>TEAM PAGE</div>
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-2">
        <div className={cx(style['web_service'])}>
          <h6 className="text-center">
            Privacy Notice © 2022 OJKJ Inc. All Right Reserved
          </h6>
        </div>
      </div>
    </footer>
  );
}
