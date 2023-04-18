import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardHeader, darken } from '@mui/material';
import RecentlyViewedPosts from './RecentlyViewPosts/RecentlyViewedPosts';

import DayStreak from './DayStreak/DayStreak';
import QuizProgress from './QuizProgress/QuizProgress';
// import CommentsDB from './CommentsDB/CommentsDB';
import NotesDB from './HighlightsDB/NotesDB';
import Notifications from './Notifications/Notifications';
// import ShowMoreComments from './CommentsDB/ShowMoreComments/ShowMoreComments';
import ShowMoreNotes from './HighlightsDB/ShowMoreNotes/ShowMoreNotes';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';
import { fetchUserHistory } from '../../services/quiz';
import UserSearchSection from './UserSearch';
import { topicActions } from '../../store/reducers/topic-slice';

export default function Dashboard() {
  const { status: quizStatus, userHistory } = useSelector(
    (state) => state.quiz
  );
  const { username, notifications } = useSelector((state) => state.user);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const isTeacher = useJwtPermssionExists({ permission: 'ROLE_TEACHER' });
  const navigate = useNavigate();
  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (
      quizStatus === 'idle' ||
      (quizStatus === 'success' && userHistory?.length === 0 && once)
    ) {
      setOnce(false);
      dispatch(
        fetchUserHistory({
          page: 0,
          size: 10,
          userId,
          jwtAccessToken,
        })
      );
    }
  }, [dispatch, jwtAccessToken, once, quizStatus, userHistory?.length, userId]);

  const handleRedirect = () => {
    dispatch(topicActions.resetData());
    navigate('/topic/new/create');
  };

  return (
    <div className="container-fluid">
      <div className="row ps-2 mt-5 mb-5 align-items-center">
        <div className="col">
          <h2 className="mb-0">
            {username.toUpperCase()}
            &apos;S DASHBOARD
          </h2>
        </div>
        {isAdmin || isTeacher ? (
          <div className="col-auto">
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: '15px', mt: 2 }}
              onClick={handleRedirect}
            >
              Create A Topic
            </Button>
          </div>
        ) : null}
        <div className="col-auto">
          <Button
            variant="contained"
            sx={{ fontSize: '15px', mt: 2 }}
            onClick={() => setShowNotifications(true)}
            endIcon={
              <Badge
                badgeContent={notifications?.length}
                color="error"
                sx={{ m: 1 }}
              />
            }
          >
            Notifications
          </Button>
          <Notifications
            show={showNotifications}
            setShow={setShowNotifications}
          />
        </div>
      </div>

      <div className="row m-1">
        <Card
          sx={{
            height: 'auto',
            border: 2,
            backgroundColor: '#c7ffd2',
            boxShadow: 2,
            padding: 0,
            margin: 0,
          }}
        >
          <CardHeader
            sx={{
              bgcolor: darken('#c7ffd2', 0.05),
              textAlign: 'center',
            }}
            title="Quizzes"
            className="text-center mb-3"
          />
          <QuizProgress userHistory={userHistory} />
        </Card>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-lg-3 mt-2">
          <div className="mb-4">
            <DayStreak />
          </div>
          <Card
            sx={{
              height: 'auto',
              border: 2,
              backgroundColor: 'var(--color-bg-main)',
              boxShadow: 2,
            }}
          >
            <CardHeader
              sx={{ bgcolor: darken('#97F9FF', 0.05) }}
              title="Recently Viewed Posts"
              className="text-center mb-3"
            />
            <RecentlyViewedPosts />
          </Card>
        </div>
        {isAdmin && (
          <div className="col-lg-4 mt-2">
            <Card>
              <UserSearchSection />
            </Card>
          </div>
        )}
        <div className="col-lg mt-2">
          <Card sx={{ height: 'auto', border: 2, backgroundColor: '#e8adad' }}>
            <CardHeader
              sx={{
                bgcolor: darken('#e8adad', 0.05),
                textAlign: 'center',
              }}
              title="Notes"
              className="text-center mb-3"
            />
            <NotesDB />
            <ShowMoreNotes />
          </Card>
        </div>
      </div>
    </div>
  );
}
