import './QuizProgress.css';
import { nanoid } from '@reduxjs/toolkit';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentUserInfo } from '../../../pages/UserProfilePage';
import QuizDB from './QuizDB/QuizDB';
import useJwtPermssionExists from '../../../hooks/use-jwtPermission';
import { quizActions } from '../../../store/reducers/quiz-reducer';

const linechar = [
  {
    qname: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', 'Quiz 6'],
    dtachart: [90, 90, 20, 50, 20, 12],
  },
];

export default function QuizProgress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const isTeacher = useJwtPermssionExists({ permission: 'ROLE_TEACHER' });
  return (
    <div>
      {currentUserInfo.map(() => {
        return (
          <div key={nanoid()} className="container-fluid">
            <div className="row">
              <div className="col text-center">
                <h5 className="text-center m-4">Scores</h5>
                <div className="row justify-content-sm-center justify-content-md-center justify-content-lg-between">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                    {linechar.map(({ qname, dtachart }) => (
                      <Chart
                        key={nanoid()}
                        type="line"
                        width={300}
                        height={300}
                        series={[
                          {
                            name: 'Quiz Score',
                            data: [
                              dtachart[0],
                              dtachart[1],
                              dtachart[2],
                              dtachart[3],
                              dtachart[4],
                              dtachart[5],
                            ],
                          },
                        ]}
                        options={{
                          xaxis: {
                            categories: [
                              qname[0],
                              qname[1],
                              qname[2],
                              qname[3],
                              qname[4],
                              qname[5],
                            ],
                          },
                          title: {
                            text: 'Quiz Scores',
                          },
                        }}
                      >
                        {' '}
                      </Chart>
                    ))}
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4 align-self-center text-center">
                    {linechar.map(({ dtachart }) => (
                      <Chart
                        key={nanoid()}
                        type="radialBar"
                        width={300}
                        height={300}
                        series={[
                          (dtachart[0] +
                            dtachart[1] +
                            dtachart[2] +
                            dtachart[3] +
                            dtachart[4] +
                            dtachart[5]) /
                            dtachart.length,
                        ]}
                        options={{
                          labels: ['Score'],
                          title: {
                            text: 'Average Quiz Score',
                          },
                        }}
                      >
                        {' '}
                      </Chart>
                    ))}
                  </div>
                  {(isAdmin || isTeacher) && (
                    <div className="col-12 cold-sm-12 col-md-12 col-lg-4 text-none text-lg-end">
                      <button
                        type="button"
                        className="quizstart"
                        onClick={() => {
                          navigate('/quiz/createquiz');
                          dispatch(quizActions.resetData());
                        }}
                      >
                        create quiz
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <h5 className="m-4 text-center">Recently Taken Quizzes</h5>
              <QuizDB />
            </div>
            <div className="row">
              <h5 className=" m-4 text-center">Assigned Quizzes</h5>
              <QuizDB />
            </div>
            <div className="mb-5"> </div>
          </div>
        );
      })}
    </div>
  );
}
