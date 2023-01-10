/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Report from '../report/Report';
import './PostPreview.css';
import { forumActions } from '../../../store/reducers/forum-reducer';
import { forumVoteActions } from '../../../store/reducers/forum-votes-reducer';

export default function ForumQuickView({
  pageId,
  userDto,
  title,
  upVotes,
  downVotes,
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <article
        key={pageId}
        className="container-fluid p-4 preview-section row"
        style={{ cursor: 'pointer' }}
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
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                dispatch(forumActions.resetData());
                dispatch(forumVoteActions.resetData());
                navigate(`${pageId}`);
              }
            }}
            role="button"
            tabIndex={0}
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
            ? title.substring(0, 40).concat('...')
            : title}
        </h2>
        <div className="row justify-content-between m-4 btn-group">
          <div className="col-auto col-lg-4 m-0 p-0 align-self-end ">
            <i className="bi bi-hand-thumbs-up ms-4"> {` ${upVotes}`}</i>
            <i className="bi bi-hand-thumbs-down ms-4"> {` ${downVotes}`}</i>
          </div>
          <div className="col-4 m-0 p-0 align-self-end">
            {isLoggedIn && <Report pageId={pageId} />}
          </div>
        </div>
      </article>
      <br />
      <br />
    </>
  );
}
