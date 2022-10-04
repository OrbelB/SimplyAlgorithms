import React, {useState} from 'react'
import styles  from './topic_quiz.module.css'
import cn from "classnames"


const Topic_quiz = () => {
  return (
    //This is the start of the container
    <div className={cn(styles['quiz_topic'], 'continer-fluid')}>
        <div className='grid p-2'>
          <div className='row'>
              Test Your knowlege
          </div>
          <div className='row'>Q1 what is a cat?</div>
          <div className='row'>
            <div className='col'>
              <div className='row'>
                <div className='col'>Q1</div>
                <div className='col'>Q2</div>
              </div>
              <div className='row'>
                <div className='col'>Q3</div>
                <div className='col'>Q4</div>
              </div>
            </div>
            <div className='col'>
              Continue Quiz
            </div>
            <div className='row'>
              Quiz information
            </div>
          </div>
        </div>
    </div>
  )
}

export default Topic_quiz

