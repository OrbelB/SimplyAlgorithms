/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import QuizQuestionModule from '../Modules/QuizQuestionsModule/QuizQuestionsModule';
import { quizActions } from '../../../store/reducers/quiz-reducer';
import QuizModule from '../Modules/QuizModule/QuizModule';
import { createQuiz } from '../../../services/quiz';

// const templateMc = {
//   ...quizinfo,
//   answer: [{}, {}, {}, {}],
// };

// const templateTF = {
//   // eslint-disable-next-line no-undef
//   ...quizinfo,
//   answer: [{}, {}],
// };

export default function CreateQuiz() {
  // const [userId, username] = useSelector((state) => state.user);
  // const [fullQuizDTO, setFullQuizDTO] = useState({});
  // const dispatch = useDispatch();

  // dispatch(quizActions.updateQuestionAnswer({}));
  // const hanndleCreateNewQuestion = (question) => {
  //   setFullQuizDTO((prevState) => {
  //     prevState.questions.append(question);
  //     return prevState;
  //   });
  // };
  const { quizQuestionDTO, quizDTO } = useSelector((state) => state.quiz);
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAddQuestion = () => {
    dispatch(quizActions.addQuizQuestion({ questionId: crypto.randomUUID() }));
  };
  const navigate = useNavigate();

  const handleSubmitQuiz = () => {
    dispatch(
      createQuiz({
        quizQuestionDTO,
        quizDTO,
        userDto: { userId },
        jwtAccessToken,
      })
    );
    navigate('/quiz', { replace: true });
  };
  return (
    <div className="container-fluid">
      <div className="text-center border border-danger rounded-5 bg-info mt-5">
        <h1>Quiz creation page</h1>
        <b>
          Please review our policies before creating a quiz{' '}
          <a href="/policies">
            <u>policies</u>
          </a>
        </b>
      </div>
      <div className="pt-5">
        <QuizModule />
      </div>
      <div className="pt-5">
        {quizQuestionDTO.map(({ questionId, question, picture, answers }) => (
          <QuizQuestionModule
            key={questionId}
            questionId={questionId} // temprary quesionId
            question={question}
            picture={picture}
            answers={answers}
            questionLength={quizQuestionDTO.length}
          />
        ))}
      </div>

      <div className="row justify-content-center pt-5">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-lg btn-outline-success"
            onClick={handleAddQuestion}
            disabled={quizQuestionDTO.answerslength <= 2}
          >
            <b>+</b>
          </button>
          <br />
        </div>
      </div>
      <div className="row justify-content-center pt-5">
        <div className="col-auto">
          <button type="button" className="btn btn-lg btn-outline-danger">
            {' '}
            cancel{' '}
          </button>{' '}
          <br />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-lg btn-outline-info"
            onClick={handleSubmitQuiz}
          >
            {' '}
            create{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
