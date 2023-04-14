/* eslint-disable no-nested-ternary */
import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button } from '@mui/material';
import { submitQuiz } from '../../../services/quiz';

import './QuizScreen.css';
// import QuizReportForm from '../ReportQuiz/ReportQuiz';
import Report from '../../report/Report';

export default function QuizScreen({
  retry,
  questions,
  quizId,
  userId,
  stop,
  jwtAccessToken,
  startedAt,
  finishedAt,
}) {
  const dispatch = useDispatch();
  const [userSelectAnswer, setUserSelectAnswer] = useState({
    position: -1,
    isCorrect: false,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (isCorrect === 1) {
      setScore(score + 1);
    }
    setUserSelectAnswer(() => {
      return { position: index, isCorrect: isCorrect === 1 };
    });
  };

  const nextQuestionChoice = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      dispatch(
        submitQuiz({
          takeQuizDTO: {
            quizId,
            userId,
            score: (score / questions.length) * 100,
            maxScore: 100,
            startedAt,
            finishedAt,
          },
          jwtAccessToken,
        })
      );
      setShowScore(true);
    }
    setUserSelectAnswer({
      position: -1,
      isCorrect: false,
    });
  };

  const buttonStyle = useCallback(
    (answerOption, index) => {
      return answerOption.isCorrect === 1 && userSelectAnswer.position !== -1
        ? 'answerbutton-right'
        : userSelectAnswer.position === index
        ? 'answerbutton-wrong'
        : 'answerbutton';
    },
    [userSelectAnswer]
  );

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  return (
    <div className="quiz-screen p-5">
      {showScore ? (
        <div className="score-section">
          <h2 className="text-center">
            <span className="d-inline-flex">
              <Chart
                type="radialBar"
                width={300}
                height={300}
                series={[(score / questions.length) * 100]}
                options={{
                  labels: ['Score'],
                }}
              >
                {' '}
              </Chart>
            </span>
            <br />
            You scored {score} out of {questions.length}
          </h2>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary m-3"
              onClick={retry}
            >
              Restart Quiz
            </button>
            <br />
            <NavLink to="/quiz">
              <button type="button" className="btn btn-secondary m-3">
                Go Back to Home Page
              </button>
            </NavLink>
          </div>
          <Button type="button" variant="contained" onClick={handleOpenReport}>
            Report
          </Button>
          <Report open={openReport} handleClose={handleCloseReport} />
        </div>
      ) : (
        <>
          <div className="question-section container">
            <div className="row justify-content-center">
              <CountdownCircleTimer
                isPlaying
                size={150}
                duration={300}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                  setShowScore(true);
                }}
              >
                {({ remainingTime }) => {
                  const hours = Math.floor(remainingTime / 3600);
                  const minutes = Math.floor((remainingTime % 3600) / 60);
                  const seconds = remainingTime % 60;
                  return (
                    <span className="h3 countbar text-center">
                      {hours}:{minutes}:{seconds}
                    </span>
                  );
                }}
              </CountdownCircleTimer>
              <div className="question-count text-center p-3 h1">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
                <div className="question-text h3 pt-3">
                  {questions[currentQuestion].question}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="answer-section d-flex flex-column align-items-center">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  id={answer.answerId}
                  key={answer.answerId}
                  type="button"
                  disabled={userSelectAnswer.position !== -1}
                  className={buttonStyle(answer, index)}
                  style={{
                    margin: '10px',
                    display: 'block',
                  }}
                  onClick={() =>
                    handleAnswerOptionClick(answer.isCorrect, index)
                  }
                >
                  <h4>{answer.answer}</h4>
                </button>
              ))}
            </div>
            <br />
            <div className="text-center">
              {questions.length === currentQuestion + 1 ? (
                <button
                  hidden={userSelectAnswer.position === -1}
                  type="button"
                  onClick={() => {
                    stop();
                    nextQuestionChoice();
                  }}
                  className="answerbutton mt-3"
                >
                  <h4>submit</h4>
                </button>
              ) : (
                <button
                  hidden={userSelectAnswer.position === -1}
                  type="button"
                  onClick={() => {
                    nextQuestionChoice();
                  }}
                  className="answerbutton mt-3"
                >
                  <h4>Next</h4>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
