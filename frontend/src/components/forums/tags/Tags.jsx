import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Input, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { selectAllTags } from '../../../store/reducers/tags-slice';
import classes from './Tags.module.css';
import { forumsActions } from '../../../store/reducers/forums-slice';
import { fetchTags } from '../../../services/tag';
import useSearchBar from '../../../hooks/use-searchBar';
import { fetchForumList } from '../../../services/forum';

export default function Tags() {
  const tags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalPages, status } = useSelector((state) => state.tags);
  const [activeTag, setActiveTag] = useState(null);
  const [searchParams] = useSearchParams();

  const handleClick = (tagId) => {
    dispatch(
      fetchForumList({
        page: 0,
        size: 10,
        tagId,
      })
    );

    if (!tagId) {
      setActiveTag('');
      dispatch(forumsActions.filterForums(''));
      dispatch(forumsActions.sortForums(''));
      return;
    }

    if (tagId === activeTag) {
      dispatch(forumsActions.filterForums(''));
      setActiveTag('');
      return;
    }
    setActiveTag(tagId);
    dispatch(forumsActions.filterForums(`${tagId}`));
  };
  const [searchValue, setSearchValue] = useState(searchParams.get('tag') ?? '');
  const { handleSearch: filterTagsContaining, searchResults: filteredTags } =
    useSearchBar({
      searchFrom: tags,
      valueSearched: 'tag',
      actionToDispatch: fetchTags,
      debounceTime: 600,
      status,
    });

  const loadMoreTags = () => {
    dispatch(fetchTags({ page, size: 10 }));
    setPage((state) => {
      return state + 1;
    });
  };

  return (
    <>
      <h1 className="category-label">Categories</h1>
      <Input
        placeholder="Search Category..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          filterTagsContaining(e);
        }}
        fullWidth
      />
      <div className="mt-4 mb-4">
        <Button
          type="button"
          variant="contained"
          sx={{
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              boxShadow:
                '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            },
          }}
          disableElevation
          className="category"
          onClick={() => handleClick()}
          elevation={3}
        >
          Clear Tag
        </Button>
        <br />
        <br />
        {filteredTags?.map((tag) => (
          <Button
            type="button"
            variant="contained"
            sx={{
              boxShadow:
                '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
              '&:hover': {
                boxShadow:
                  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
              },
            }}
            key={tag?.tagId}
            disableElevation
            className={`${classes.category} ${
              activeTag === tag?.tagId ? classes.activeCategory : ''
            }`}
            onClick={() => handleClick(tag?.tagId)}
            elevation={3}
          >
            {tag?.tag}
          </Button>
        ))}
        {totalPages > 0 && (
          <Button
            className={classes['last-button']}
            onClick={loadMoreTags}
            hidden={totalPages === page}
            type="button"
            variant="contained"
            sx={{
              boxShadow:
                '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
              '&:hover': {
                boxShadow:
                  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
              },
            }}
          >
            Explore More...
          </Button>
        )}
      </div>
    </>
  );
}
