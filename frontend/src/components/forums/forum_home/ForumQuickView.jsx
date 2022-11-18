import { useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import Report from "../report/Report.jsx";
import Vote from "../../vote_comp/Vote.jsx";
import "./PostPreview.css";
import { useDispatch } from "react-redux";
import { forumActions } from "../../../store/reducers/forum-reducer.js";

export default function ForumQuickView({
  pageId,
  userDto,
  title,
  upVotes,
  downVotes,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <article
        key={pageId}
        className="preview-section"
        style={{ cursor: "pointer" }}
        typeof="button"
      >
        <div
          className="first-line"
          onClick={() => {
            dispatch(forumActions.resetData());
            navigate(`${pageId}`);
          }}
        >
          <img
            src={userDto.profilePicture}
            className="rounded-circle m-2"
            height="38"
            alt="current profile user"
            loading="lazy"
          />
          <h2 className="preview-username">{userDto.username}</h2>
        </div>
        <h2
          className="preview-title"
          onClick={() => {
            dispatch(forumActions.resetData());
            navigate(`${pageId}`);
          }}
        >
          {title.trim().length > 40
            ? title.substring(0, 40).concat("...")
            : title}
        </h2>
        <div className="third-line">
          <div className="left-side">
            <Vote like_={upVotes} dislike_={downVotes} />
          </div>
          <div className="right-side">
            <Report pageId={pageId} />
          </div>
        </div>
      </article>
      <br />
      <br />
    </>
  );
}
