import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import style from './Footer.module.css';
import image from '../../assets/footer-logo.png';

export default function Footer() {
  return (
    <footer className={cx(style.box, 'container-fluid w-100')}>
      <div className="row">
        <div className="col-md-2 m-md-5">
          <img
            className={cx(style['web-logo'])}
            src={image}
            alt="Simply Algorithms Logo"
            height="75"
            width="75"
          />
        </div>
        <div className="col-md-2 mt-4">
          <h5 className="text-uppercase fw-old mb-4">Links</h5>
          <div className={cx(style.web_nav)}>
            <ul>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="algorithms"
                >
                  Algorithms
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="quiz"
                >
                  Quizzes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="forums"
                >
                  Forums
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cx(style['nav-footer-link'])}
                  aria-current="page"
                  to="aboutus"
                >
                  About us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 mt-4">
          <h5 className="text-uppercase fw-old mb-4">Socials</h5>
          <div className={cx(style.web_soc, 'row')}>
            <ul>
              <li>
                <a className={cx(style['social-link'])} href="url">
                  Twitter
                </a>
              </li>
              <li>
                <a className={cx(style['social-link'])} href="url">
                  Youtube
                </a>
              </li>
              <li>
                <a className={cx(style['social-link'])} href="url">
                  Linkedin
                </a>
              </li>
              <li>
                <a className={cx(style['social-link'])} href="url">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col mt-4">
          <div className="row">
            <h5 className="text-center">CONTACT US</h5>
            <p className="text-center">
              <span className={cx(style.email)}>info@gmail.com</span>
            </p>
          </div>
          <div className="row text-center">
            <h5 className="text-center text-uppercase">Meet the Team</h5>
            <form>
              <div className={cx(style.team_butt)}>
                <button type="button" className="btn btn-outline-dark">
                  <div className={cx(style.team_butt)}>
                    <NavLink aria-current="page" to="/team">
                      TEAM PAGE
                    </NavLink>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-0 m-0">
        <div className={cx(style.web_service)}>
          <h6 className="text-center">
            Privacy Notice © 2022 OJKJ Inc. All Right Reserved
          </h6>
        </div>
      </div>
    </footer>
  );
}
