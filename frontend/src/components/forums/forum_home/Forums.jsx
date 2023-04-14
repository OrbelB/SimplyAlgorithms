import './Forums.css';
import { Input, Button, ButtonGroup } from '@mui/material';
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
        <div className="pb-5 pt-2 d-flex justify-content-center text-center">
          <ButtonGroup variant="contained">
            <Button
              id="upVotes"
              className="filter-button first-filter"
              onClick={(e) => sortForums(e)}
              type="button"
            >
              Top Rated
            </Button>
            <Button
              id="createdDate"
              className="filter-button"
              onClick={(e) => sortForums(e)}
              type="button"
            >
              New
            </Button>
            <Button
              id="title"
              className="filter-button"
              onClick={(e) => sortForums(e)}
              type="button"
            >
              Alphabetical
            </Button>
            <Button
              id=""
              className="filter-button last-filter"
              onClick={(e) => sortForums(e)}
              type="button"
            >
              Other
            </Button>
          </ButtonGroup>
        </div>
        <div className="col-auto col-lg-3 p-2 p-sm-2 p-md-2 p-lg-2">
          <div className="side1">
            <Tags />
          </div>
        </div>
        <div
          className={
            isLoggedIn
              ? `col-auto col-lg-6   p-2 p-sm-4 p-sx-4 p-md-4 text-center`
              : 'col-auto col-lg-10 col-lg-10  p-2 p-sm-4 p-sx-4 p-md-4 text-center'
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
          <div className="col-auto col-md-12 col-lg-3 p-lg-4 p=xs-2 p-sm-2 p-md-3 ">
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
