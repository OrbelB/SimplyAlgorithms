import './QuizDB.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const quizdb = [
  {
    quizname: 'Quiz Name',
    quizcreatedby: 'Simply Algorithms',
    quizscore: '74',
    quizattempts: '2',
  },
  {
    quizname: 'Quiz Name',
    quizcreatedby: 'Simply Algorithms',
    quizscore: '40',
    quizattempts: '3',
  },
  {
    quizname: 'Quiz Name',
    quizcreatedby: 'Simply Algorithms',
    quizscore: '19',
    quizattempts: '1',
  },
];

export default function QuizDB() {
  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-start align-items-end">
        {quizdb.map((item) => (
          <div key={nanoid()} className="col">
            <div className="card quizdb p-2">
              <div className="container-fluid">
                <div className="row">
                  <h5>{item.quizname}</h5>
                </div>
                <div className="row">
                  <p>Created By {item.quizcreatedby}</p>
                </div>
                <div className="row">
                  <div className="col">
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
          </div>
        ))}
      </div>
    </div>
  );
}
