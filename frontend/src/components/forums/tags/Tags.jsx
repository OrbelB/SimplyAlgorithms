import { useSelector, useDispatch } from "react-redux";
import { selectAllTags } from "../../../store/reducers/tags-reducer";
import classes from "./Tags.module.css";
import { forumsActions } from "../../../store/reducers/forums-reducer";
import { fetchTags } from "../../../services/tag";
import { useState } from "react";
export default function Tags() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const tags = useSelector(selectAllTags);
  const handleClick = (tagId) => {
    dispatch(forumsActions.filterForums(`${tagId}`));
  };

  const loadMoreTags = () => {
    dispatch(fetchTags({ page: page, size: 10 }));
    setPage(page + 1);
  };
  return (
    <div className="btn-group">
      {tags?.map((tag) => (
        <button
          key={tag?.tagId}
          className={classes["category"]}
          onClick={() => handleClick(tag?.tagId)}
        >
          {tag?.tag}
        </button>
      ))}
      <button className={classes["last-button"]} onClick={() => loadMoreTags()}>
        {" "}
        Explore More...
      </button>
    </div>
  );
}
