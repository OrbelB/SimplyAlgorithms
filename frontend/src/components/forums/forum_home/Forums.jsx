/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import './Forums.css';
import { useDispatch, useSelector } from 'react-redux';
import PostPreview from './PostPreview';
import Post from '../post/Post';
import Related_RecentPosts from './Related_RecentPosts';
import { forumsActions } from '../../../store/reducers/forums-reducer';
import Tags from '../tags/Tags';

export default function Forums() {
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sortByAlphabetical = () => dispatch(forumsActions.sortForums('title'));
  const sortByNew = () => dispatch(forumsActions.sortForums('createdDate'));
  const sortByTopRated = () => dispatch(forumsActions.sortForums('upVotes'));
  const sortByOther = () => dispatch(forumsActions.sortForums('pageId'));
  return (
    <div className="forums-section">
      <h1 className="forum-title center">FORUMS</h1>
      <div className="row">
        <div className="column">
          <div className="side1">
            <Tags />
          </div>

          <div className="middle">
            <div className="filters">
              <button
                className="filter-button first-filter"
                onClick={sortByTopRated}
                type="button"
              >
                Top Rated
              </button>
              <button
                className="filter-button"
                onClick={sortByNew}
                type="button"
              >
                New
              </button>
              <button
                className="filter-button"
                onClick={sortByAlphabetical}
                type="button"
              >
                Alphabetical
              </button>
              <button
                className="filter-button last-filter"
                onClick={sortByOther}
                type="button"
              >
                Other
              </button>
            </div>
            <br />
            <br />
            <div className="middle-post">
              <Post />
            </div>
            <br />
            <br />
            <PostPreview />
          </div>
          {isLoggedIn && jwtAccessToken !== '' && (
            <div className="side2">
              <div className="recent-posts">
                <h1 className="category-label">Recently Viewed Posts</h1>
                <Related_RecentPosts />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
