import styles  from './TopicQuiz.module.css'
import cx from "classnames"


const TopicQuiz = () => {

  const option_arr = ["option A", "option B", "option C", "option D"];
  return (
    //This is the start of the container
    <div className={'container-fluid'}>
        <div className={cx(styles['quiz_topic_container'],'grid p-4 m-5')}>
          <div className='row'>
              <h2 className={cx(styles['topic_quiz_header'])}>Test Your knowledge</h2>
          </div>
          <div className='row'>
            <h4 className={cx(styles['topic_quiz_header'])}>Q: What is a cat?</h4>
          </div>
          <div className='row'>
          <div className='col-sm-2'></div>
            <div className='col-sm'>
              <div className='row '>
                <div className='col-sm-auto'>
                  <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[0]}</button>
                </div>
                <div className='col-sm-auto' >
                 <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[1]}</button>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-auto'>
                 <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[2]}</button>
                </div>
                <div className='col-sm-auto'>
                  <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[3]}</button>
                </div>
              </div>
            </div>
            <div className='col'>
              <button className={cx(styles['quiz_buttons_cont'])}>continue quiz</button>
            </div>
            <div className='row'>
              <div className='col-sm-8'></div>
              <div className='col-sm-auto'>
                <a className={cx(styles['quiz_info'], ' p-2')} href='https://developer.mozilla.org/en-US/' target="_blank" rel="noreferrer">QUIZ NAME</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TopicQuiz

