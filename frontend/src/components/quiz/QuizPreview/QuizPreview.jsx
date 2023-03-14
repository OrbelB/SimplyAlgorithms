import './QuizPreview.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { quizActions } from '../../../store/reducers/quiz-reducer';

export default function QuizDB({ quizList, status }) {
  const dispatch = useDispatch();
  if (status === 'success') {
    return (
      <div className="flex d-flex flex-wrap justify-content-around g-0 mt-5">
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
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    );
  }
}
