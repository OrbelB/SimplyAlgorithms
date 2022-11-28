import { useSelector, useDispatch } from "react-redux";
import { selectAllTags } from "../../../store/reducers/tags-reducer";
import classes from "./Tags.module.css";
import { forumsActions } from "../../../store/reducers/forums-reducer";
import { fetchTags } from "../../../services/tag";
import { useEffect, useState } from "react";
import { useRef } from "react";
export default function Tags() {
  const categoryToSearch = useRef("");
  const tags = useSelector(selectAllTags);
  const [showedTags, setShowedTags] = useState(tags);
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

    if (showedTags.length === 0 && categoryToSearch?.current.value === "") {
      setShowedTags(tags);
    }
  }, [tags, showedTags, dispatch, page]);

  const filterBy = (str) => {
    return tags.filter((tag) =>
      new RegExp("^"  + str.toLowerCase().replace(/\*/g, ".*") + "$").test(tag.tag.toLowerCase())
    );
  };
  const findTag = (e) => {
    if (e.target.value === "") {
      setShowedTags([]);
      return;
    }
    setShowedTags(filterBy(`${categoryToSearch.current.value}*`));
  };

  const loadMoreTags = () => {
    dispatch(fetchTags({ page: page, size: 10 }));
    setPage((state) => {
      return state + 1;
    });
  };

  return (
    <>
      <h1 className="category-label">Categories</h1>
      <input
        ref={categoryToSearch}
        onChange={findTag}
        type="text"
        className="search-bar"
        placeholder="Search Category..."
      />
      <div className="btn-group">
        {showedTags?.map((tag) => (
          <button
            key={tag?.tagId}
            className={classes["category"]}
            onClick={() => handleClick(tag?.tagId)}
          >
            {tag?.tag}
          </button>
        ))}
        {categoryToSearch.current.value === "" && (
          <button
            className={classes["last-button"]}
            onClick={() => loadMoreTags()}
            hidden={totalPages === page}
          >
            Explore More...
          </button>
        )}
      </div>
    </>
  );
}
