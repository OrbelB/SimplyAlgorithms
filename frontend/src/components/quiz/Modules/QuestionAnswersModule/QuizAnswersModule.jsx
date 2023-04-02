import { TextareaAutosize, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import { quizActions } from '../../../../store/reducers/quiz-slice';

export default function QuizAnswersModule({
  answer,
  isCorrect,
  questionId,
  answerId,
  answerLength,
}) {
  const dispatch = useDispatch();
  const handleRemoveAnswer = () => {
    dispatch(quizActions.removeQuestionAnswer({ questionId, answerId }));
  };
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
          <TextareaAutosize
            className="w-100"
            required
            value={answer}
            label="answer"
            onChange={(e) => {
              dispatch(
                quizActions.updateQuestionAnswer({
                  questionId,
                  answerId,
                  answer: e.target.value,
                })
              );
            }}
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
