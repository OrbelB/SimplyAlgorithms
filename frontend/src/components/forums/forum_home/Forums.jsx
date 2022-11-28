import "./Forums.css";
import PostPreview from "./PostPreview";
import Post from "../post/Post";
import Related_RecentPosts from "./Related_RecentPosts";
import { forumsActions } from "../../../store/reducers/forums-reducer";
import { useDispatch, useSelector } from "react-redux";
import Tags from "../tags/Tags";

export default function Forums() {
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sortByAlphabetical = () => dispatch(forumsActions.sortForums("title"));
  const sortByNew = () => dispatch(forumsActions.sortForums("createdDate"));
  const sortByTopRated = () => dispatch(forumsActions.sortForums("upVotes"));
  const sortByOther = () => dispatch(forumsActions.sortForums("pageId"))
  return (
    <div className="forums-section">
      <h1 className="forum-title center">FORUMS</h1>
      <div className="row">
        <div className="column">
          <div className="side1">
            <h1 className="category-label">Categories</h1>
            <input
              type="text"
              className="search-bar"
              placeholder="Search Category..."
            />
            <Tags />
          </div>

          <div className="middle">
            <div className="filters">
            <button
              className="filter-button first-filter"
              onClick={sortByTopRated}
            >
              Top Rated
            </button>
            <button className="filter-button" onClick={sortByNew}>
              New
            </button>
            <button className="filter-button" onClick={sortByAlphabetical}>
              Alphabetical
            </button>
            <button className="filter-button last-filter" onClick={sortByOther}>Other</button>
            </div>
            <br />
            <br />
            <div className="middle-post">
            <Post />
            </div>
            <br />
            <br />
            <PostPreview />
          </div>
          {isLoggedIn && jwtAccessToken !== "" && (
            <div className="side2">
              <div className="recent-posts">
                <h1 className="category-label">Recently Viewed Posts</h1>
                <Related_RecentPosts />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
