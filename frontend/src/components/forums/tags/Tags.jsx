import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { selectAllTags } from '../../../store/reducers/tags-reducer';
import classes from './Tags.module.css';
import { forumsActions } from '../../../store/reducers/forums-reducer';
import { fetchTags } from '../../../services/tag';

export default function Tags() {
  const [searchedTag, setSearchedTag] = useState('');
  const tags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalPages } = useSelector((state) => state.tags);

  const handleClick = (tagId) => {
    dispatch(forumsActions.filterForums(`${tagId}`));
  };

  useEffect(() => {
    if (tags.length === 0) {
      dispatch(fetchTags({ page: page - 1, size: 10 }));
    }
  }, [tags, dispatch, page]);

  // filtering tags by searched param, using user memo to memoizes the results
  // and only render if the results are different from the previous ones.
  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      return new RegExp(
        `^${searchedTag.concat('*').toLowerCase().replace(/\*/g, '.*')}$`
      ).test(tag.tag.toLowerCase());
    });
  }, [tags, searchedTag]);

  const loadMoreTags = () => {
    dispatch(fetchTags({ page, size: 10 }));
    setPage((state) => {
      return state + 1;
    });
  };

  return (
    <>
      <h1 className="category-label">Categories</h1>
      <input
        value={searchedTag}
        onChange={(e) => setSearchedTag(e.target.value)}
        type="text"
        className="search-bar"
        placeholder="Search Category..."
      />
      <div className="btn-group">
        {filteredTags?.map((tag) => (
          <button
            key={tag?.tagId}
            className={classes.category}
            onClick={() => handleClick(tag?.tagId)}
            type="button"
          >
            {tag?.tag}
          </button>
        ))}
        {searchedTag === '' && (
          <button
            className={classes['last-button']}
            onClick={() => loadMoreTags()}
            hidden={totalPages === page}
            type="button"
          >
            Explore More...
          </button>
        )}
      </div>
    </>
  );
}
