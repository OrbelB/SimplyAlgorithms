/* eslint-disable no-nested-ternary */
import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { Button, Avatar } from '@mui/material';
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
  userDto,
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
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ fontSize: '15px' }}
              className="m-3"
              onClick={retry}
            >
              Restart Quiz
            </Button>
            <br />
            <NavLink to="/quiz">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                sx={{ fontSize: '15px' }}
                className="m-3"
              >
                Go Back to Home Page
              </Button>
            </NavLink>
          </div>
          <Button
            type="button"
            variant="contained"
            sx={{ fontSize: '15px' }}
            onClick={handleOpenReport}
          >
            Report
          </Button>
          <Report
            open={openReport}
            handleClose={handleCloseReport}
            culpritUserId={userDto?.userId}
            foreignId={quizId}
            typeOfForeignId="quiz"
            victumUserId={userId}
          />
        </div>
      ) : (
        <>
          <div className="question-section container">
            <div className="row justify-content-center">
              <div className="question-count text-center p-3 h1">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
                <div className="margin-bottom-lg"> </div>
                {questions[currentQuestion].picture !== '' &&
                  questions[currentQuestion].picture !== null && (
                    <span>
                      <Avatar
                        sx={{ width: 350, height: 350 }}
                        src={questions[currentQuestion].picture}
                        className="mx-auto my-3"
                        alt="quiz picture"
                        loading="lazy"
                        variant="rounded"
                      />
                    </span>
                  )}
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
                    width: '75%',
                    height: 'auto',
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
                  className="quizenterbutton mt-3"
                >
                  <h4>Submit</h4>
                </button>
              ) : (
                <button
                  hidden={userSelectAnswer.position === -1}
                  type="button"
                  onClick={() => {
                    nextQuestionChoice();
                  }}
                  className="quizenterbutton mt-3"
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
