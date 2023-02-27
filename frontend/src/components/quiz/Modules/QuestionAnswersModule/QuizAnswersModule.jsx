/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { TextareaAutosize, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { quizActions } from '../../../../store/reducers/quiz-reducer';

export default function QuizAnswersModule({
  answer,
  isCorrect,
  questionId,
  answerId,
}) {
  const dispatch = useDispatch();

  const handleChangeAnswerPrompt = () => {
    dispatch(quizActions.updateQuestionAnswer({answer}))
  }
  const temp = '';
  return (
    <div className="container-fluid pt-2">
      <div className="row justify-content-center">
        <TextField
          className="col-auto w-50 mb-3"
          required
          label="answer"
          value={temp}
        />
      </div>
    </div>
  );
}
