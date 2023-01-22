/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import './Forums.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PostPreview from './PostPreview';
import Post from '../post/Post';
import Related_RecentPosts from './RelatedRecentPosts';
import Tags from '../tags/Tags';
import { fetchForumList } from '../../../services/forum';
import { forumsActions } from '../../../store/reducers/forums-reducer';

export default function Forums() {
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useSearchParams();
  const dispatch = useDispatch();
  const sortForums = (e) => {
    dispatch(forumsActions.sortForums(e.target.id));
    if (
      (e.target.id === '' && sortBy.get('sortBy') === '') ||
      (sortBy.get('sortBy') && sortBy.get('sortBy').toString() === e.target.id)
    ) {
      return;
    }

    sortBy.set('sortBy', e.target.id);
    setSortBy(sortBy, {
      replace: true,
    });
    dispatch(
      fetchForumList({
        page: 0,
        size: 10,
        sortBy: sortBy.get('sortBy').toString(),
      })
    );
  };
  return (
    <div className="forums-section container-fluid">
      <h1 className="forum-title center">FORUMS</h1>
      <div className="row justify-content-around">
        <div className="column">
          <div className="side1">
            <Tags />
          </div>

          <div className="middle">
            <div className="filters pb-5 pt-2">
              <button
                id="upVotes"
                className="filter-button first-filter"
                onClick={(e) => sortForums(e)}
                type="button"
              >
                Top Rated
              </button>
              <button
                id="createdDate"
                className="filter-button"
                onClick={(e) => sortForums(e)}
                type="button"
              >
                New
              </button>
              <button
                id="title"
                className="filter-button"
                onClick={(e) => sortForums(e)}
                type="button"
              >
                Alphabetical
              </button>
              <button
                id=""
                className="filter-button last-filter"
                onClick={(e) => sortForums(e)}
                type="button"
              >
                Other
              </button>
            </div>
            <Post />
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
