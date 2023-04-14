import './Forums.css';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PostPreview from './PostPreview';
import Post from '../post/Post';
import RelatedRecentPost from './RelatedRecentPosts';
import Tags from '../tags/Tags';
import { fetchForumList } from '../../../services/forum';
import {
  forumsActions,
  selectSortedForums,
} from '../../../store/reducers/forums-slice';
import useSearchBar from '../../../hooks/use-searchBar';

export default function Forums() {
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const { status: forumsStatus } = useSelector((state) => state.forums);
  const forums = useSelector(selectSortedForums);
  const { handleSearch: filterPagesContaining, searchResults: filteredPages } =
    useSearchBar({
      searchFrom: forums,
      valueSearched: 'title',
      actionToDispatch: fetchForumList,
      debounceTime: 500,
      status: forumsStatus,
    });
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
      <h1 className="forum-title text-center">FORUMS</h1>
      <div className="row justify-content-around align-self-center">
        <div className="row filters pb-5 pt-2 d-flex justify-content-center">
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
        <div className="col-auto col-md-3">
          <div className="side1">
            <Tags />
          </div>
        </div>
        <div
          className={
            isLoggedIn
              ? `col-auto col-md-6  text-center`
              : 'col-auto col-md-10 col-lg-10 text-center'
          }
        >
          <Post />
          <br />
          <br />
          <Input
            className="mb-5"
            placeholder="Search By Name..."
            onChange={(e) => filterPagesContaining(e)}
            fullWidth
          />
          <PostPreview forums={filteredPages} />
        </div>

        {isLoggedIn && jwtAccessToken !== '' && (
          <div className="col-auto col-md-3">
            <div className="side2">
              <div className="recent-posts">
                <h1 className="category-label">Recently Viewed Posts</h1>
                <RelatedRecentPost />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
