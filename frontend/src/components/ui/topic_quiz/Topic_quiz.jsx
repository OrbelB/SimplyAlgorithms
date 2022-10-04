import React, {useState} from 'react'
import styles  from './topic_quiz.module.css'
import cx from "classnames"


const Topic_quiz = () => {

  const oprtion_arr = ["option_a", "option_b", "option_c", "option_d"];
  return (
    //This is the start of the container
    <div className={cx(styles['quiz_topic'], 'continer-fluid')}>
        <div className='grid p-2'>
          <div className='row'>
              Test Your knowlege
          </div>
          <div className='row'>Q1 what is a cat?</div>
          <div className='row'>
            <div className='col'>
              <div className='row'>
                <div className='col'>
                  <button className={cx(styles['quiz_buttons_select_a'])}></button>
                </div>
                <div className='col'>
                 <button className={cx(styles['quiz_buttons_select_b'])}></button>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                 <button className={cx(styles['quiz_buttons_select_b'])}></button>
                </div>
                <div className='col'>
                  <button className={cx(styles['quiz_buttons_select_a'])}></button>
                </div>
              </div>
            </div>
            <div className='col'>
            <button className={cx(styles['quiz_buttons_cont'])}></button>
            </div>
            <div className='row'>
              <a className={cx(styles['quiz_info'])} href='https://developer.mozilla.org/en-US/' target="_blank">QUIZ NAME</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Topic_quiz

