import './QuizDB.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function QuizDB({ userHistory }) {
  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-start align-items-end">
        {userHistory?.map(
          ({
            createdBy,
            quizDTO,
            averageScore,
            attempts,
            highestScore,
            lowestSore,
          }) => (
            <div key={() => nanoid()} className="col">
              <div className="card quizdb p-2">
                <div className="container-fluid">
                  <div className="row">
                    <h3>{quizDTO.title}</h3>
                  </div>
                  <div className="row">
                    <p>Created By {createdBy.username}</p>
                  </div>
                  <div className="row">
                    <div className="col-auto">
                      <CircularProgressbar
                        value={averageScore}
                        text={`${averageScore}%`}
                        maxValue={100}
                        minValue={0}
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
                    <div className="col-auto">
                      <h6>Attempts: {attempts} </h6>
                    </div>
                    <div className="col-auto">
                      <h6>Highest Score: {highestScore}</h6>
                    </div>
                    <div className="col-auto">
                      <h6>Lowest Score: {lowestSore}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
