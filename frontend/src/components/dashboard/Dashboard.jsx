import { useState } from 'react';
import { useSelector } from 'react-redux';
import RecentlyViewedPosts from './RecentlyViewPosts/RecentlyViewedPosts';
import TopicsDB from './TopicsDB/TopicsDB';
import './Dashboard.css';
import DayStreak from './DayStreak/DayStreak';
import QuizProgress from './QuizProgress/QuizProgress';
import CommentsDB from './CommentsDB/CommentsDB';
import HighlightsDB from './HighlightsDB/HighlightsDB';
import Notifications from './Notifications/Notifications';
import ShowMoreComments from './CommentsDB/ShowMoreComments/ShowMoreComments';
import ShowMoreHighlights from './HighlightsDB/ShowMoreHighlights/ShowMoreHighlights';

export default function Dashboard() {
  const { username, dashboardInfo } = useSelector((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row ps-2 justify-content-between mt-4">
        <div className="col-auto align-self-center 0">
          <h2>
            {username.toUpperCase()}
            &apos;S DASHBOARD
          </h2>
        </div>
        <div className="col-auto">
          <div className="">
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
          </div>
          <Notifications
            show={showNotifications}
            setShow={setShowNotifications}
          />
        </div>
      </div>
      <div className="row mt-4 ps-3">
        <div className="card border-dark quizzes">
          <h4 className="card-header text-center">Quizzes</h4>
          <QuizProgress />
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
        <div className="col-lg-4 mt-2">
          <div className="card border-dark topics">
            <h4 className="card-header text-center">Topics</h4>
            <TopicsDB />
          </div>
        </div>
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
