import { useNavigate } from "react-router-dom";
import Report from "../report/Report.jsx";
import Vote from "../../vote_comp/Vote.jsx";
import { BiLike, BiDislike } from "react-icons/bi";
import "./PostPreview.css";
import { useDispatch } from "react-redux";
import { forumActions } from "../../../store/reducers/forum-reducer.js";
import { forumVoteActions } from "../../../store/reducers/forum-votes-reducer.js";

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
        className="container-fluid p-4 preview-section row"
        style={{ cursor: "pointer" }}
        typeof="button"
      >
        <div className="row">
          <div
            className="col-auto col-md-2 mt-1"
            onClick={() => {
              dispatch(forumActions.resetData());
              dispatch(forumVoteActions.resetData());
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
          </div>
          <h2 className="preview-username col-auto col-md-2">
            {userDto.username}
          </h2>
        </div>
        <h2
          className="row justify-content-center"
          onClick={() => {
            dispatch(forumActions.resetData());
            navigate(`${pageId}`);
          }}
        >
          {title.trim().length > 40
            ? title.substring(0, 40).concat("...")
            : title} 
        </h2>
        <div className="row justify-content-between m-4 btn-group">
          <div className="col-auto col-lg-4 m-0 p-0 align-self-end ">
            <i className="bi bi-hand-thumbs-up ms-4"> {" " + upVotes}</i>
            <i className="bi bi-hand-thumbs-down ms-4"> {" " + downVotes}</i>
          </div>
          <div className="col-4 m-0 p-0 align-self-end">
            <Report pageId={pageId} />
          </div>
        </div>
      </article>
      <br />
      <br />
    </>
  );
}
