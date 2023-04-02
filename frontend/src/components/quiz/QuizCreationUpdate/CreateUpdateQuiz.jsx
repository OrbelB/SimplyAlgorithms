import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuizQuestionModule from '../Modules/QuizQuestionsModule/QuizQuestionsModule';
import { quizActions } from '../../../store/reducers/quiz-slice';
import QuizModule from '../Modules/QuizModule/QuizModule';
import {
  createQuiz,
  fetchSingleQuiz,
  updateQuiz,
} from '../../../services/quiz';

export default function CreateQuiz() {
  const { quizId: quizToEditId } = useParams();
  const { quizQuestionDTO, quizDTO, userDTO } = useSelector(
    (state) => state.quiz
  );
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [once, setOnce] = useState(false);
  const handleAddQuestion = () => {
    dispatch(
      quizActions.addQuizQuestion({
        questionId: crypto.randomUUID(),
        quizId: quizDTO.quizId,
      })
    );
  };
  const navigate = useNavigate();

  const handleSubmitQuiz = async () => {
    try {
      await dispatch(
        createQuiz({
          quizQuestionDTO,
          quizDTO,
          userDto: { userId },
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      dispatch(quizActions.resetData());
      navigate('/quiz', { replace: true });
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      await dispatch(
        updateQuiz({
          userDto: userDTO,
          quizDTO,
          quizQuestionDTO,
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      dispatch(quizActions.resetData());
      navigate('/quiz', { replace: true });
    }
  };

  useEffect(() => {
    if (quizToEditId && Object.keys(userDTO).length === 0 && !once) {
      setOnce(true);
      dispatch(fetchSingleQuiz({ quizId: quizToEditId, jwtAccessToken }));
    }
  }, [dispatch, quizToEditId, userDTO, once, jwtAccessToken]);

  const editOrCreateButton =
    quizToEditId === quizDTO.quizId && Object.keys(userDTO).length !== 0 ? (
      <button
        type="button"
        className="btn btn-lg btn-outline-info"
        onClick={handleUpdateQuiz}
      >
        update
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-lg btn-outline-info"
        onClick={handleSubmitQuiz}
      >
        create
      </button>
    );

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
            questionId={questionId}
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
      <div className="row justify-content-center pt-5 mb-5">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-lg btn-outline-danger"
            onClick={() => {
              dispatch(quizActions.resetData());
              navigate('/quiz', { replace: true });
            }}
          >
            cancel
          </button>
          <br />
        </div>
        <div className="col-auto">{editOrCreateButton}</div>
      </div>
    </div>
  );
}
