import './QuizPreview.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuizList } from '../../../services/quiz';
import { quizActions } from '../../../store/reducers/quiz-reducer';
// const quizpreview = [
//   {
//     quizname: 'Quiz Sample',
//     quizcreatedby: 'Simply Algorithms',
//     quizscore: '--',
//     quizattempts: '2',
//     quizwiki: '/quiz/sample',
//   },
// ];

export default function QuizDB() {
  const dispatch = useDispatch();
  const { status, quizList } = useSelector((state) => state.quiz);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(
        fetchQuizList({
          page: 0,
          size: 20,
        })
      );
    }
  }, [dispatch, status]);

  if (status === 'success') {
    return (
      <div className="d-flex flex-wrap align-content-between">
        {quizList.map(({ quizId, title, score, createdBy }) => (
          <NavLink
            key={nanoid()}
            className="nav-hover"
            aria-current="page"
            to={quizId}
            onClick={() => dispatch(quizActions.resetData())}
          >
            <div className="card quizpreview p-3 w-75 m-4">
              <div className="container-fluid">
                <div className="row">
                  <h5>{title}</h5>
                </div>
                <div className="row">
                  <p>Created By {createdBy.username}</p>
                </div>
                <div className="row">
                  <div className="col-5">
                    <CircularProgressbar
                      value={score}
                      text={`${score}%`}
                      strokeWidth="10"
                      styles={buildStyles({
                        strokeLinecap: 'round',
                        textSize: '18px',
                        pathColor: `#0000FF`,
                        textColor: 'black',
                        trailColor: 'darkgray',
                      })}
                    />
                  </div>
                  {/* <div className="col">
                    <h6>Attempts: {item.quizattempts} </h6>
                  </div> */}
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    );
  }
}
