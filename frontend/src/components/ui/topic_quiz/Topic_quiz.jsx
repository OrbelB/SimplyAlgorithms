import React, {useState} from 'react'
import styles  from './topic_quiz.module.css'
import cx from "classnames"


const Topic_quiz = () => {

  const option_arr = ["option A", "option B", "option C", "option D"];
  return (
    //This is the start of the container
    <div className={cx(styles['quiz_topic_container'], 'continer-fluid')}>
        <div className='grid p-4'>
          <div className='row'>
              <h2 className={cx(styles['topic_quiz_header'])}>Test Your knowlege</h2>
          </div>
          <div className='row'>
            <h4 className={cx(styles['topic_quiz_header'])}>Q: What is a cat?</h4>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='row '>
                <div className='col'>
                  <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[0]}</button>
                </div>
                <div className='col'>
                 <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[1]}</button>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                 <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[2]}</button>
                </div>
                <div className='col'>
                  <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[3]}</button>
                </div>
              </div>
            </div>
            <div className='col'>
              <button className={cx(styles['quiz_buttons_cont'])}>continue quiz</button>
            </div>
            <div className='row'>
              <div className='col col-lg'>
                <a className={cx(styles['quiz_info'])} href='https://developer.mozilla.org/en-US/' target="_blank">QUIZ NAME</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Topic_quiz

