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
          <div key={() => nanoid()} className="container-fluid">
            <div className="row">
              <div className="col text-center">
                <h5 className="text-center m-4">Scores</h5>
                <div className="row justify-content-sm-center justify-content-md-center justify-content-lg-between">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4">
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
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4 align-self-center text-center">
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
                  {(isAdmin || isTeacher) && (
                    <div className="col-12 cold-sm-12 col-md-12 col-lg-4 text-none text-lg-end">
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          navigate('/quiz/createquiz');
                          dispatch(quizActions.resetData());
                        }}
                      >
                        create quiz
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <h5 className="m-4 text-center">Recently Taken Quizzes</h5>
              <QuizDB userHistory={userHistory} />
            </div>
            <div className="mb-5"> </div>
          </div>
        );
      })}
    </div>
  );
}
