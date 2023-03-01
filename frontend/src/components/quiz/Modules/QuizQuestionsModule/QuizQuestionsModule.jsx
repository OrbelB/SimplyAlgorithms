/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import { useDispatch } from 'react-redux';
import QuizAnswersModule from '../QuestionAnswersModule/QuizAnswersModule';
import { quizActions } from '../../../../store/reducers/quiz-reducer';
import imageToStringBase64 from '../../../../utilities/image-to-data-url';

export default function QuizQuestionModule({
  questionId,
  question,
  picture,
  answers,
  // eslint-disable-next-line no-unused-vars
  deleteQuestion = false,
  questionLength,
}) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);

  const handleChangeQuestionPrompt = (e) => {
    dispatch(
      quizActions.updateQuestionProblem({
        questionId,
        question: e.target.value,
      })
    );
  };
  const handleImage = async (e) => {
    setImage(e.target.files[0]);
    let stringBase64Image = '';
    await imageToStringBase64(e.target.files[0]).then((data) => {
      stringBase64Image = data;
    });
    dispatch(
      quizActions.updateQuestionPicture({
        questionId,
        picture: stringBase64Image,
      })
    );
  };

  const handleAddAnswer = () => {
    dispatch(
      quizActions.addQuestionAnswer({
        answerId: crypto.randomUUID(),
        questionId,
      })
    );
  };

  return (
    <div className="container-fluid pt-5">
      <div className="bg-light rounded-5">
        <div className="row justify-content-end pt-3">
          <div className="col-auto ">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              name="delete question"
              id="danger-outlined"
              onClick={() => {
                dispatch(
                  quizActions.deleteQuestion({
                    questionId,
                    deleteQuestion: true,
                  })
                );
              }}
              disabled={questionLength === 1}
            >
              delete question
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="text-center w-50 pb-3">
            <img
              src={
                picture ||
                (image && URL.createObjectURL(image)) ||
                'https://via.placeholder.com/350x350'
              }
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
        <div className="row justify-content-center pb-5">
          <TextareaAutosize
            value={question}
            className="w-75 mb-2"
            required
            onChange={(e) => handleChangeQuestionPrompt(e)}
            label="question?"
          />
        </div>
        {/* the buttons down here will set the number of answers can fill in */}
        <div className="row justify-content-center">
          {/* include redio buttons here to select which on us correct */}

          {answers.map(({ answer, answerId, isCorrect }) => (
            <QuizAnswersModule
              key={answerId}
              answer={answer}
              answerId={answerId}
              isCorrect={isCorrect}
              questionId={questionId}
              answerLength={answers.length}
            />
          ))}
        </div>
        <div className="row justify-content-center p-4">
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
