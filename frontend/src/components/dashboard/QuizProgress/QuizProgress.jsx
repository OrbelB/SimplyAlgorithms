/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import './QuizProgress.css';
import { nanoid } from '@reduxjs/toolkit';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { currentUserInfo } from '../../../pages/UserProfilePage';
import QuizDB from './QuizDB/QuizDB';
import useJwtPermssionExists from '../../../hooks/use-jwtPermission';
import { quizActions } from '../../../store/reducers/quiz-slice';

export default function QuizProgress({ userHistory }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add the average score of all quizzes
  // to get the overall average by dividing by the length of the array
  const averageScore = useMemo(
    () =>
      userHistory.reduce((acc, quiz) => {
        return acc + quiz.averageScore;
      }, 0) / userHistory.map((quiz) => quiz.averageScore).length,
    [userHistory]
  );
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const isTeacher = useJwtPermssionExists({ permission: 'ROLE_TEACHER' });
  return (
    <div>
      {currentUserInfo.map(() => {
        return (
          <div key={nanoid()} className="container-fluid">
            <div className="d-flex justify-content-center align-items-center flex-column">
              {(isAdmin || isTeacher) && (
                <div className="text-end">
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      navigate('/quiz/createquiz');
                      dispatch(quizActions.resetData());
                    }}
                  >
                    Create Quiz
                  </Button>
                </div>
              )}
              <h4 className="text-center my-4">Scores</h4>
            </div>
            <div className="d-flex justify-content-center my-4">
              <div className="row">
                <div className="col-12 col-md-6 mb-4 pr-md-3">
                  <Chart
                    type="line"
                    width={300}
                    height={300}
                    series={[
                      {
                        name: 'Quiz Score',
                        data: userHistory.map((quiz) =>
                          Number(quiz.averageScore)
                        ),
                      },
                    ]}
                    options={{
                      xaxis: {
                        categories: userHistory.map(
                          (quiz) => quiz.quizDTO.title
                        ),
                      },
                      title: {
                        text: 'Quiz Scores',
                      },
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 pl-md-3">
                  <Chart
                    type="radialBar"
                    width={300}
                    height={300}
                    series={[Number(averageScore)]}
                    options={{
                      labels: ['Score'],
                      title: {
                        text: 'Average Quiz Score',
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <h4 className="m-4 text-center">Recently Taken Quizzes</h4>
              <QuizDB userHistory={userHistory} />
            </div>
            <div className="mb-5"> </div>
          </div>
        );
      })}
    </div>
  );
}
