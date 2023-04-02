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

  const handleClick = (tagId) => {
    dispatch(
      fetchForumList({
        page: 0,
        size: 10,
        tagId,
      })
    );
    dispatch(forumsActions.filterForums(`${tagId}`));
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
            key={tag?.tagId}
            className={classes.category}
            onClick={() => handleClick(tag?.tagId)}
            type="button"
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
          >
            Explore More...
          </Button>
        )}
      </div>
    </>
  );
}
