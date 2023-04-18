import './QuizJoin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Avatar } from '@mui/material';
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
          <h1 className="qname text-center display-4 mb-2">
            {quiz.title.toUpperCase()}
          </h1>
          <p className="qname text-center mb-5">{quiz.description}</p>
          {/* <h5 className="qdescription m-5 text-left">{quizDTO.title}</h5> */}
          <div>
            <Avatar
              sx={{ width: 250, height: 250 }}
              src={quiz.picture}
              className="mx-auto my-3 border-2 border border-info"
              alt="quiz picture"
              loading="lazy"
              variant="rounded"
            />
          </div>
        </div>
        <div className="col-md-2 qinfo col-sm-9 mb-3">
          <div className="text-left mb-2">
            <h5>Questions</h5>
            <p className="fs-4">{amountOfQuestions}</p>
          </div>
          <div className="text-left">
            {/* <h5>Time Limit</h5>
            <p className="fs-4">None</p> */}
            <h5>Created By </h5>
            <p className="fs-5"> {createdBy.username} </p>
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
