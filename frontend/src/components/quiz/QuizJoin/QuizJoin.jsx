import './QuizJoin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OptionsMenu from '../../options-menu';
import { deleteQuiz } from '../../../services/quiz';
import { quizActions } from '../../../store/reducers/quiz-slice';

export default function JoinQuiz({
  start,
  quiz,
  amountOfQuestions,
  createdBy,
  jwtAccessToken,
  authUserId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteQuiz = async () => {
    try {
      await dispatch(
        deleteQuiz({ quizId: quiz.quizId, userId: authUserId, jwtAccessToken })
      ).unwrap();
    } finally {
      dispatch(quizActions.resetData());
      navigate(`/quiz`, { replace: true });
    }
  };

  const handleEdiQuiz = () => {
    navigate(`/quiz/${quiz.quizId}/edit`);
  };
  return (
    <div className="join-screen containter w-100 p-5">
      <div key={quiz.quizId}>
        <div className="row">
          <div className="col-md-8">
            <h1 className="qname text-center">{quiz.title.toUpperCase()}</h1>
            {/* <h5 className="qdescription m-5 text-left">{quizDTO.title}</h5> */}
          </div>
          <div className="col-auto qinfo">
            <h5 className="qamount text-left">
              Questions: {amountOfQuestions}
            </h5>
            {/* <h5 className="qattempts text-left">Attempts Left: 2</h5> */}
            <h5 className="qtime text-left">Time Limit: ∞ minutes</h5>
          </div>
          <div className="col-auto text-end">
            <OptionsMenu
              handleOnDelete={handleDeleteQuiz}
              handleOnEdit={handleEdiQuiz}
              userId={createdBy.userId}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button type="button" className="quizstart" onClick={start}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
