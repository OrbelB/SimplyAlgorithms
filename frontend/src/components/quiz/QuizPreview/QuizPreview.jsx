import './QuizPreview.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';

const quizpreview = [
  {
    quizname: 'Quiz Sample',
    quizcreatedby: 'Simply Algorithms',
    quizscore: '--',
    quizattempts: '2',
    quizwiki: '/quiz/sample',
  },
];

export default function QuizDB() {
  return (
    <div className="d-flex flex-wrap align-content-between">
      {quizpreview.map((item) => (
        <NavLink
          key={nanoid()}
          className="nav-hover"
          aria-current="page"
          to={item.quizwiki}
        >
          <div className="card quizpreview p-3 w-75 m-4">
            <div className="container-fluid">
              <div className="row">
                <h5>{item.quizname}</h5>
              </div>
              <div className="row">
                <p>Created By {item.quizcreatedby}</p>
              </div>
              <div className="row">
                <div className="col-5">
                  <CircularProgressbar
                    value={item.quizscore}
                    text={`${item.quizscore}%`}
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
                <div className="col">
                  <h6>Attempts: {item.quizattempts} </h6>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
