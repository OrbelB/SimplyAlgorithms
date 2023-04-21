import './QuizJoin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Avatar } from '@mui/material';
import OptionsMenu from '../../options-menu';
import { deleteQuiz } from '../../../services/quiz';
import { quizActions } from '../../../store/reducers/quiz-slice';
import image from '../../../assets/quiz.png';

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
    <div className="join-screen container-fluid p-5">
      <div key={quiz.quizId} className="row">
        <div className="row-mb-2 text-end">
          <OptionsMenu
            handleOnDelete={handleDeleteQuiz}
            culpritUserId={createdBy?.userId}
            foreignId={quiz.quizId}
            typeOfForeignId="quiz"
            handleOnEdit={handleEditQuiz}
            userId={createdBy.userId}
          />
        </div>

        <div className="col-md-4 mb-3 text-end">
          <div className="col-auto">
            <Avatar
              sx={{
                width: '15.625rem',
                height: '15.625rem',
                '@media (max-width: 850px)': {
                  width: '10rem',
                  height: '10rem',
                },
              }}
              src={
                quiz.picture === null || quiz.picture === ''
                  ? image
                  : quiz.picture
              }
              className="mx-auto my-3"
              alt={image}
              loading="lazy"
              variant="rounded"
            />

            <hr />
            <div className="text-center mb-2">
              <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Questions
              </h5>
              <p style={{ fontSize: '1.6rem' }} className="fs-4">
                {amountOfQuestions}
              </p>
            </div>
            <div className="text-center">
              <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Created By{' '}
              </h5>
              <p style={{ fontSize: '1.4rem' }} className="fs-5">
                {createdBy.username}
              </p>
              <p style={{ fontSize: '1.4rem' }} className="fs-5">
                Max Score: {quiz.score} <br />
                Created on:{' '}
                {new Date(quiz.createdDate).toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h1 className="qtitle text-center display-4 mb-2">
            {quiz.title.toUpperCase()}
          </h1>
          <p className="qname text-start mb-5">{quiz.description}</p>
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
      </div>
    </div>
  );
}
