import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { selectAllTags } from '../../../store/reducers/tags-reducer';
import classes from './Tags.module.css';
import { forumsActions } from '../../../store/reducers/forums-reducer';
import { fetchTags } from '../../../services/tag';

export default function Tags() {
  const tags = useSelector(selectAllTags);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalPages } = useSelector((state) => state.tags);
  const [searchedTag, setSearchedTag] = useState('');
  const handleClick = (tagId) => {
    dispatch(forumsActions.filterForums(`${tagId}`));
  };

  // filtering tags by searched param, using use memo to memoize the results
  // and only render if the dependency attrs are different from the previous ones.
  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      return new RegExp(
        `^${searchedTag.concat('*').toLowerCase().replace(/\*/g, '.*')}$`
      ).test(tag.tag.toLowerCase());
    });
  }, [tags, searchedTag]);

  const filterTagsContaining = debounce((e) => {
    dispatch(fetchTags({ page: 0, size: 10, filterBy: e.target.value }));
    setSearchedTag(e.target.value);
  }, 350);

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
        onChange={(e) => filterTagsContaining(e)}
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
        {totalPages > 0 && (
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
