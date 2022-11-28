import styles from './TopicQuiz.module.css'
import cx from "classnames"


const TopicQuiz = () => {

    const option_arr = ["O(m + n)", "O(n^2)", "O(n)", "O(m + 10) "];
    return (
        <div className={styles['quiz-section']}>
            {/*This is the start of the container*/}
            <div className={'container'}>
                <div className={cx(styles['quiz_topic_container'], 'grid p-4 m-5 rounded-4')}>
                    <div className='row'>
                        <h2 className={cx(styles['topic_quiz_header'])}>Test Your knowledge</h2>
                    </div>
                    <div className='row justify-content-start'>
                        <h4 className={cx(styles['topic_quiz_header'], 'mb-4 mb-sm-4')}>Q: what is the time complexity for BFS Graphs?</h4>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col'>
                            <div className='row justify-content-center'>
                                <div className='col-auto col-sm-auto p-0'>
                                    <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[0]}</button>
                                </div>
                                <div className='col-auto col-sm-auto p-0'>
                                    <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[1]}</button>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-auto col-sm-auto p-0'>
                                    <button className={cx(styles['quiz_buttons_select_b'])}>{option_arr[2]}</button>
                                </div>
                                <div className='col-auto col-sm-auto p-0'>
                                    <button className={cx(styles['quiz_buttons_select_a'])}>{option_arr[3]}</button>
                                </div>
                            </div>
                        </div>
                        <div className='col text-center align-self-center'>
                            <button className={cx(styles['quiz_buttons_cont'], 'mt-2 rounded-5 p-2 p-sm-auto')}>
                                continue quiz
                            </button>
                        </div>
                    </div>
                    <div className='row justify-content-center mt-5'>
                        <a className={cx(styles['quiz_info'], 'p-2')} href='https://developer.mozilla.org/en-US/'
                           target="_blank" rel="noreferrer">QUIZ NAME</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopicQuiz

