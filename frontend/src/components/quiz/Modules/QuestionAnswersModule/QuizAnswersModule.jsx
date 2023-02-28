/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextareaAutosize, TextField, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import debounce from 'lodash.debounce';
import { quizActions } from '../../../../store/reducers/quiz-reducer';

export default function QuizAnswersModule({
  answer,
  isCorrect,
  questionId,
  answerId,
  answerLength,
}) {
  const [answerInput, setAnswerInput] = useState(answer);
  const dispatch = useDispatch();

  const handleChangeAnswerPrompt = (e) => {
    setAnswerInput(e.target.value);
  };
  const handleRemoveAnswer = () => {
    dispatch(quizActions.removeQuestionAnswer({ questionId, answerId }));
  };

  const temp = '';
  return (
    <div className="container-fluid pt-4">
      <div className="row justify-content-center align-items-center ">
        <div className="col-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleRemoveAnswer}
            disabled={answerLength <= 2}
          >
            <b>-</b>
          </button>
        </div>
        <div className="col-7">
          <TextField
            className="w-100"
            required
            label="answer"
            onChange={debounce((e) => {
              dispatch(
                quizActions.updateQuestionAnswer({
                  questionId,
                  answerId,
                  answer: e.target.value,
                })
              );
            }, 500)}
          />
        </div>

        <div className="col-1">
          <Radio
            checked={isCorrect === 1}
            onChange={() =>
              dispatch(
                quizActions.updateQuestionAnswerIsCorrect({
                  questionId,
                  answerId,
                  isCorrect: isCorrect === 1 ? 0 : 1,
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
