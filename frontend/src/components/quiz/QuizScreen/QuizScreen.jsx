/* eslint-disable no-nested-ternary */
import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './QuizScreen.css';
import QuizReportForm from '../ReportQuiz/ReportQuiz';

export default function QuizScreen({ retry, questions }) {
  // const questions = [
  //   {
  //     questionText: 'What is the capital of France?',
  //     answerOptions: [
  //       { answerText: 'New York', isCorrect: false },
  //       { answerText: 'London', isCorrect: false },
  //       { answerText: 'Paris', isCorrect: true },
  //       { answerText: 'Dublin', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'Who is CEO of Tesla?',
  //     answerOptions: [
  //       { answerText: 'Jeff Bezos', isCorrect: false },
  //       { answerText: 'Elon Musk', isCorrect: true },
  //       { answerText: 'Bill Gates', isCorrect: false },
  //       { answerText: 'Tony Stark', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'The iPhone was created by which company?',
  //     answerOptions: [
  //       { answerText: 'Apple', isCorrect: true },
  //       { answerText: 'Intel', isCorrect: false },
  //       { answerText: 'Amazon', isCorrect: false },
  //       { answerText: 'Microsoft', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'How many Harry Potter books are there?',
  //     answerOptions: [
  //       { answerText: '1', isCorrect: false },
  //       { answerText: '4', isCorrect: false },
  //       { answerText: '6', isCorrect: false },
  //       { answerText: '7', isCorrect: true },
  //     ],
  //   },
  // ];
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
    console.info(JSON.stringify(userSelectAnswer));
  };

  const nextQuestionChoice = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
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
          <QuizReportForm />
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
            <div className="answer-section text-center">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  id={answer.answerId}
                  key={answer.answerId}
                  type="button"
                  disabled={userSelectAnswer.position !== -1}
                  className={buttonStyle(answer, index)}
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
              <button
                hidden={userSelectAnswer.position === -1}
                type="button"
                onClick={() => nextQuestionChoice()}
                className="answerbutton mt-3"
              >
                <h4>Next</h4>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
