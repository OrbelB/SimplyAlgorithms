import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import RecentlyViewedPosts from './RecentlyViewPosts/RecentlyViewedPosts';

import './Dashboard.css';
import DayStreak from './DayStreak/DayStreak';
import QuizProgress from './QuizProgress/QuizProgress';
import CommentsDB from './CommentsDB/CommentsDB';
import HighlightsDB from './HighlightsDB/HighlightsDB';
import Notifications from './Notifications/Notifications';
import ShowMoreComments from './CommentsDB/ShowMoreComments/ShowMoreComments';
import ShowMoreHighlights from './HighlightsDB/ShowMoreHighlights/ShowMoreHighlights';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';
import { fetchUserHistory } from '../../services/quiz';
import UserSearchSection from './UserSearch';

export default function Dashboard() {
  const { status: quizStatus, userHistory } = useSelector(
    (state) => state.quiz
  );
  const { username, dashboardInfo } = useSelector((state) => state.user);
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
    navigate('/topic/new/create');
  };

  return (
    <div className="container-fluid">
      <div className="row ps-2 justify-content-between mt-4">
        <div className="col-auto align-self-center 0">
          <h2>
            {username.toUpperCase()}
            &apos;S DASHBOARD
          </h2>
        </div>
        {isAdmin || isTeacher ? (
          <div className="col-auto align-self-center 0">
            <Button
              variant="contained"
              color="success"
              onClick={handleRedirect}
            >
              create topic
            </Button>
          </div>
        ) : null}
        <div className="col-auto">
          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            className="bts btn"
            data-bs-toggle="modal"
            data-bs-target="#notificationdb"
          >
            <h5>
              Notifications
              <span className="badge">
                {dashboardInfo?.notifications?.length}
              </span>
            </h5>
          </button>

          <Notifications
            show={showNotifications}
            setShow={setShowNotifications}
          />
        </div>
      </div>
      <div className="row mt-4 ps-3">
        <div className="card border-dark quizzes">
          <h4 className="card-header text-center">Quizzes</h4>
          <QuizProgress userHistory={userHistory} />
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-lg-3 mt-2">
          <div className="mt-2 mb-4">
            <DayStreak />
          </div>
          <div className="card rvp">
            <div className="card-header text-center">
              <h5>Recently Viewed Posts</h5>
            </div>
            <RecentlyViewedPosts />
          </div>
        </div>
        {isAdmin && (
          <div className="col-lg-4 mt-2">
            <UserSearchSection />
          </div>
        )}
        <div className="col-lg mt-2">
          <div className="card side-right-1">
            <h4 className="card-header text-center">Notifications</h4>
            <CommentsDB />
            <ShowMoreComments />
          </div>
        </div>
        <div className="col-lg mt-2">
          <div className="card side-right-2">
            <h4 className="card-header text-center">Highlights</h4>
            <HighlightsDB />
            <ShowMoreHighlights />
          </div>
        </div>
      </div>
    </div>
  );
}
