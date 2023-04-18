import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Input, Button } from '@mui/material';

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

  const handleClick = (tagId) => {
    dispatch(
      fetchForumList({
        page: 0,
        size: 10,
        tagId,
      })
    );
    dispatch(forumsActions.filterForums(`${tagId}`));
    setActiveTag(tagId);
  };

  const { handleSearch: filterTagsContaining, searchResults: filteredTags } =
    useSearchBar({
      searchFrom: tags,
      valueSearched: 'tag',
      actionToDispatch: fetchTags,
      debounceTime: 500,
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
        onChange={(e) => filterTagsContaining(e)}
        fullWidth
      />
      <div className="mt-4 mb-4">
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
