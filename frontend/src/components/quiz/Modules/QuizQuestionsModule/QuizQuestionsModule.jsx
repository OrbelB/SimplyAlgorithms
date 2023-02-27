/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextareaAutosize, TextField } from '@mui/material';
import { Placeholder } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import QuizAnswersModule from '../QuestionAnswersModule/QuizAnswersModule';
import { quizActions } from '../../../../store/reducers/quiz-reducer';

export default function QuizQuestionModule({
  questionId,
  question,
  picture,
  answers,
  deleteQuestion,
}) {
  const temp = '';
  const dispatch = useDispatch();

  const handleImage = (e) => {};

  const handleAddAnswer = () => {
    dispatch(quizActions.addQuestionAnswer({ answerId: nanoid(), questionId }));
  };

  return (
    <div className="container-fluid pt-5">
      <div className="bg-light rounded-5">
        <div className="row justify-content-end pt-3">
          <div className="col-auto ">
            <input
              type="radio"
              className="btn-check"
              name="delete question"
              id="danger-outlined"
              autoComplete="off"
            />
            <label className="btn btn-outline-danger" htmlFor="danger-outlined">
              delete question
            </label>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="text-center w-50 pb-3">
            <img
              src={picture}
              height="350px"
              width="350px"
              className="rounded-4 m-4"
              alt="question_image"
            />
            <input
              type="file"
              id="questionImage"
              className="form-control"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImage}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <TextField
            className="col-auto w-50 mb-2"
            required
            label="question?"
            value={question}
          />
        </div>
        {/* the buttons down here will set the number of answers can fill in */}
        <div className="row justify-content-center pb-5">
          <div className="col-auto">
            <button className="btn btn-outline-secondary" type="button">
              True/False
            </button>
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary" type="button">
              Multiple choice
            </button>
          </div>
        </div>
        <div className="row">
          {/* include redio buttons here to select which on us correct */}

          {answers.map(({ answer, answerId, isCorrect }) => (
            <QuizAnswersModule
              key={answerId}
              answer={answer}
              answerId={answerId}
              isCorrect={isCorrect}
              questionId={questionId}
            />
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={handleAddAnswer}
            >
              <b>+</b>
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
// {/*
// // {question.answers.map(() => (
// //         <QuizAnswersModule {..args}/>)
// //         } */}
