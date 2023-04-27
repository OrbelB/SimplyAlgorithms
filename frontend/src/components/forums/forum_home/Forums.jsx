import './Forums.css';
import { Input, Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PostPreview from './PostPreview';
import Post from '../post/Post';
import RelatedRecentPost from './RelatedRecentPosts';
import Tags from '../tags/Tags';
import { fetchForumList } from '../../../services/forum';
import { selectFilteredAndSortedForums } from '../../../store/reducers/forums-slice';
import useSearchBar from '../../../hooks/use-searchBar';

export default function Forums() {
  const [activeButton, setActiveButton] = useState('upVotes');
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const { status: forumsStatus } = useSelector((state) => state.forums);
  const [searchParams, setSearchParms] = useSearchParams();
  const forums = useSelector((state) =>
    selectFilteredAndSortedForums(state, searchParams.get('sortBy')?.toString())
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get('title') ?? ''
  );
  const { handleSearch: filterPagesContaining, searchResults: filteredPages } =
    useSearchBar({
      searchFrom: forums,
      valueSearched: 'title',
      actionToDispatch: fetchForumList,
      debounceTime: 500,
      status: forumsStatus,
    });

  const dispatch = useDispatch();
  const sortForums = (e) => {
    if (
      (e.target.id === '' && searchParams.get('sortBy') === '') ||
      (searchParams.get('sortBy') &&
        searchParams.get('sortBy').toString() === e.target.id)
    ) {
      return;
    }
    searchParams.set('sortBy', e.target.id);
    setSearchParms(searchParams, {
      replace: true,
    });
    dispatch(
      fetchForumList({
        page: 0,
        size: 10,
        sortBy: searchParams.get('sortBy')?.toString(),
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
              className={`filter-button first-filter ${
                activeButton === 'upVotes' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                sortForums(e);
                setActiveButton('upVotes');
              }}
              type="button"
            >
              Top Rated
            </Button>
            <Button
              id="createdDate"
              className={`filter-button ${
                activeButton === 'createdDate' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                sortForums(e);
                setActiveButton('createdDate');
              }}
              type="button"
            >
              New
            </Button>
            <Button
              id="title"
              className={`filter-button ${
                activeButton === 'title' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                sortForums(e);
                setActiveButton('title');
              }}
              type="button"
            >
              Alphabetical
            </Button>
            <Button
              id=""
              className={`filter-button last-filter ${
                activeButton === '' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                sortForums(e);
                setActiveButton('');
              }}
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
              ? `col-auto col-lg-6  p-2 p-sm-4 p-sx-4 p-md-4 text-center`
              : 'col-auto col-lg-9  p-2 p-sm-4 p-sx-4 p-md-4 text-center'
          }
        >
          {isLoggedIn && <Post />}
          <br />
          <br />
          <Input
            className="mb-5"
            placeholder="Search By Name..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              filterPagesContaining(e);
            }}
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
