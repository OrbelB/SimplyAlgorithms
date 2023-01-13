import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import style from './Footer.module.css';
import image from '../../assets/footer-logo.png';

function Footer() {
  return (
    // The borders are just temp -> so i can view where it is
    <footer className={cx(style.box, 'container-fluid w-100')}>
      <div className="row justify-content-center p-0">
        <div className="col-.5" />
        <div className="col-1">
          <div className={cx(style.web_nav, 'row')}>
            <ul>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="algorithms"
                >
                  Algorithms
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="quizzes"
                >
                  Quizzes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="forums"
                >
                  Forums
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-link'])}
                  aria-current="page"
                  to="aboutus"
                >
                  About us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1 align-self-center">
          <div className={cx(style.web_soc, 'row')}>
            <ul>
              <li>
                <a href="url">Twitter</a>
              </li>
              <li>
                <a href="url">Youtube</a>
              </li>
              <li>
                <a href="url">Linkedin</a>
              </li>
              <li>
                <a href="url">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-6 align-self-center">
          <div className={cx(style.web_logo, 'row')}>
            <img src={image} alt="Simply Algorithms Logo" />
          </div>
          <div className={cx(style.web_service, 'row', 'mt-3')}>
            <p>Contact us Privacy Notice © 2022 OJKJ Inc. All Right Reserved</p>
          </div>
        </div>

        <div className="col-2 align-self-center">
          <div className={cx(style.ojkj_team, 'row')}>
            <div className="ojkj">
              <NavLink className="nav-link" aria-current="page" to="/team">
                Meet the Team
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// <img src={image} alt="Simply Algorithms Logo" />
