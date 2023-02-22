import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import style from './Footer.module.css';
import image from '../../assets/footer-logo.png';

export default function Footer() {
  return (
    <footer className={cx(style.box, 'mt-4')}>
      <div className="row g-0 border-bottom border-top border-dark justify-content-center justify-content-sm-center justify-content-md-between">
        <div className="col-12 col-md-12 col-lg-3 col-xl-3 mt-4 ps-4 text-center">
          <img
            className={cx(style['web-logo'])}
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
          <h5 className="text-uppercase ps-4">Links</h5>
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
        <div
          className={cx(
            'col-12 col-md-12 col-lg-3 col-xl-3 pt-4 text-md-left-side text-center fh-100 border-start border-dark'
          )}
        >
          <h5 className="text-uppercase fw-old ps-4 mb-4">Socials</h5>
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
        <div className="col-12 col-md-12 col-lg-3 col-xl-3 pt-4 border-start border-dark">
          <div className="row justify-content-center mb-5 ps-5">
            <h5 className="text-center">CONTACT US</h5>
            <p className="text-center">
              <span className={cx(style.email)}>info@gmail.com</span>
            </p>
          </div>
          <div className="row justify-content-center text-center ps-5">
            <h5 className="text-center text-uppercase">Meet the Team</h5>
            <form>
              <div className={cx(style.team_butt, 'mb-4')}>
                <button type="button" className="btn btn-outline-dark">
                  <div className={cx(style.team_butt, '')}>
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
      <div className="m-2">
        <div className={cx(style.web_service)}>
          <h6 className="text-center">
            Privacy Notice © 2022 OJKJ Inc. All Right Reserved
          </h6>
        </div>
      </div>
    </footer>
  );
}
