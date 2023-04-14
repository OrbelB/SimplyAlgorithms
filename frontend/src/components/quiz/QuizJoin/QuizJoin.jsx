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

  const handleEditQuiz = () => {
    navigate(`/quiz/${quiz.quizId}/edit`);
  };
  return (
    <div className="join-screen container-fluid vh-100 p-5">
      <div key={quiz.quizId} className="row">
        <div className="col-md-8">
          <h1 className="qname text-center display-4 mb-5">
            {quiz.title.toUpperCase()}
          </h1>
          {/* <h5 className="qdescription m-5 text-left">{quizDTO.title}</h5> */}
        </div>
        <div className="col-md-2 qinfo col-6 mb-3">
          <div className="text-left mb-2">
            <h5>Questions</h5>
            <p className="fs-4">{amountOfQuestions}</p>
          </div>
          <div className="text-left">
            <h5>Time Limit</h5>
            <p className="fs-4">∞ minutes</p>
          </div>
        </div>
        <div className="col-auto text-end">
          <OptionsMenu
            handleOnDelete={handleDeleteQuiz}
            handleOnEdit={handleEditQuiz}
            userId={createdBy.userId}
          />
        </div>
      </div>
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn btn-primary btn-lg quizstart"
          onClick={start}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
