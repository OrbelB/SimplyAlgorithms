import { currentUserInfo } from '../../pages/UserProfilePage';
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
  return (
    <div>
      {currentUserInfo.map(({ index, username }) => {
        return (
          <div key={index} className="container-fluid w-100">
            <div className="row mt-4">
              <div className="col-lg-10 justify-content-start">
                <h2>{username}&apos;s Dashboard</h2>
              </div>
              <div className="col-md">
                <Notifications />
              </div>
            </div>
            <div className="row mt-3">
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
                  <h4 className="card-header text-center">Comments</h4>
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
      })}
    </div>
  );
}
