import { currentUserInfo } from '../../pages/UserProfilePage';
import RecentlyViewedPosts from './RecentlyViewPosts/RecentlyViewedPosts';
import TopicsDB from './TopicsDB/TopicsDB';
import './Dashboard.css';
import TopicsProgress from './TopicsProgress/TopicsProgress';
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
          <div key={index} className="container">
            <div className="row mt-5">
              <div className="col-sm-10 justify-content-start">
                <h2 className="">{username}&apos;s Dashboard</h2>
              </div>
              <div className="col-2 justify-content-end">
                <Notifications />
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col mt-2">
                <div className="side-left">
                  <h4 className="text-center">Recently Viewed Posts</h4>
                  <RecentlyViewedPosts />
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="middle-left">
                  <h4 className="mt-2 text-center">Topics</h4>
                  <div className="foreground">
                    <TopicsDB />
                  </div>
                </div>
                <div className="bottomdb mt-2">
                  <h4 className="mt-2 text-center">Quizzes</h4>
                  <QuizProgress />
                </div>
              </div>
              <div className="col-md-2 mt-2">
                <div className="middle-right-1 text-center">
                  <TopicsProgress />
                </div>
                <div className="middle-right-2 mt-2">
                  <DayStreak />
                </div>
              </div>
              <div className="col-xl-3 mt-2">
                <div className="side-right-1">
                  <h4 className="mt-2 text-center">Comments</h4>
                  <CommentsDB />
                  <ShowMoreComments />
                </div>
                <div className="side-right-2 mt-2">
                  <h4 className="mt-2 text-center">Highlights</h4>
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
