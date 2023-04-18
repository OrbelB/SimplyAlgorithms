import './QuizJoin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
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
    <div className="join-screen container-fluid min-vh-100 p-3">
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <h1 className="qname text-center display-4 mb-5">
              {quiz.title.toUpperCase()}
            </h1>
          </div>
          <div className="row justify-content-center">
            <img
              className="img-fluid"
              loading="lazy"
              style={{ maxHeight: 800, maxWidth: 650 }}
              src="https://cdn.pixabay.com/photo/2015/04/28/07/55/mindset-743166__340.jpg"
              alt="quiz"
            />
          </div>
          <div className="row">
            <p className=" text-start display-5 mb-5">
              some random text to describe what the quiz is all about and what
              the user can expect
            </p>
          </div>
        </div>
        <div className="col-md-2 qinfo col-sm-9 mb-3">
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
            culpritUserId={createdBy?.userId}
            foreignId={quiz.quizId}
            typeOfForeignId="quiz"
            handleOnEdit={handleEditQuiz}
            userId={createdBy.userId}
          />
        </div>
      </div>
      <div className="text-center mt-5">
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ fontSize: '20px' }}
          onClick={start}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
