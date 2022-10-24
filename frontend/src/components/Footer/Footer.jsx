import React from 'react'
import style from './Footer.module.css'
import image from '../../assets/logo-placeholder-image-small.png'
import { NavLink } from 'react-router-dom';
import cx from "classnames";
const Footer = () => {
  return (
    //The borders are just temp -> so i can view where it is
    <footer className={cx(style['box'], 'container-fluid')}>
      <div className={'row justify-content-center p-0'}>
        <div className={'col-.5'}></div>
        <div className={'col-1'}>
            <div className={cx(style['web_nav'], 'row')}>
              <ul className={"web_nav_list"}>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"home"}>Home</NavLink>  
                </li>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"algorithms"}>Algorithms</NavLink>  
                </li>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"quizzes"}>Quizzes</NavLink>  
                </li>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"forums"}>Forums</NavLink>  
                </li>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"dashboard"}>Dashboard</NavLink>  
                </li>
                <li>
                  <NavLink className="nav-link" aria-current="page" to={"aboutus"}>About us</NavLink>  
                </li>
              </ul>
            </div>
        </div>
        <div className={'col-1 align-self-center'}>
            <div className={cx(style['web_soc'], 'row')}>
              <ul className={"web_soc_list"}>
                <li>twitter</li>
                <li>Youtube</li>
                <li>linkedin</li>
                <li>Quizes</li>
                <li>Facebook</li>
              </ul>
            </div>
        </div>

        <div className={'col-6 align-self-center'}>
          <div className={cx(style['web_logo'], "row")}>
            <img src={image} alt="Simply Algorithms Logo" 
            />
          </div>
          <div className={cx(style['web_service'], "row")}>
              <div>
                  Contact us  Privacy Notice © 2022 OJKJ Inc. All Right Reserved
              </div>
          </div>
        </div>
        
        <div className={'col-2 align-self-center'}>
          <div className={cx(style['ojkj_team'], 'row')}>
            <div className={"ojkj"}>
              <NavLink className="nav-link" aria-current="page" to={"team"}>Meet OJKJ</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

//<img src={image} alt="Simply Algorithms Logo" />
