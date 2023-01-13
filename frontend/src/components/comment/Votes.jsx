/* eslint-disable jsx-a11y/control-has-associated-label */
import cx from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { voteComment, deleteCommentVote } from '../../services/comment';
import styles from './Upvotes.module.css';
import { selectAllCommentVotes } from '../../store/reducers/comment-vote-reducer';

export default function Votes({ commentId, upVotes, downVotes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [votes, setVotes] = useState(upVotes - downVotes);
  const {
    userId: authUserID,
    jwtAccessToken,
    isLoggedIn,
  } = useSelector((state) => state.auth);

  const allCommentVotes = useSelector(selectAllCommentVotes);

  const handleUpVotes = async () => {
    const isThereAVote = allCommentVotes.find(
      (vote) => vote?.commentId === commentId
    );
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // create the comment if the vote does not exists
    if (
      !isThereAVote ||
      (isThereAVote.commentId === null && isThereAVote.userId === null)
    ) {
      dispatch(
        voteComment({
          votedComment: { commentId, userId: authUserID, likeDislike: true },
          accessToken: jwtAccessToken,
        })
      );
      setVotes(votes + 1);
    } else {
      // votes are not for this specific comment
      if (
        isThereAVote.commentId !== commentId ||
        isThereAVote.userId !== authUserID
      ) {
        return;
      }
      if (isThereAVote.likeDislike) {
        dispatch(
          deleteCommentVote({
            userId: authUserID,
            commentId,
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes - 1);
      }
      if (!isThereAVote.likeDislike) {
        dispatch(
          voteComment({
            votedComment: { commentId, userId: authUserID, likeDislike: true },
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes + 2);
      }
    }
  };

  const handleDownVotes = async () => {
    const isThereAVote = allCommentVotes.find(
      (vote) => vote?.commentId === commentId
    );
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // create a vote if the vote does not exists
    if (
      !isThereAVote ||
      (isThereAVote.commentId === null && isThereAVote.userId === null)
    ) {
      dispatch(
        voteComment({
          votedComment: { commentId, userId: authUserID, likeDislike: false },
          accessToken: jwtAccessToken,
        })
      );
      setVotes(votes - 1);
    } else {
      if (
        isThereAVote.commentId !== commentId ||
        isThereAVote.userId !== authUserID
      ) {
        return;
      }
      // remove the vote if it exists when liked
      if (!isThereAVote.likeDislike) {
        dispatch(
          deleteCommentVote({
            userId: authUserID,
            commentId,
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes + 1);
      }
      if (isThereAVote.likeDislike) {
        dispatch(
          voteComment({
            votedComment: { commentId, userId: authUserID, likeDislike: false },
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes - 2);
      }
    }
  };

  return (
    <div className={cx('container-fluid square', styles['container-style'])}>
      <div className="grid">
        <div
          type="button"
          className="row-cols-auto justify-content-center align-self-start text-center p-2"
        >
          <i
            className={cx('bi bi-plus', styles['btn-sign-style'])}
            onClick={() => {
              handleUpVotes();
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                handleUpVotes();
              }
            }}
            role="button"
          />
        </div>
        <div className="row-cols-auto justify-content-center align-self-center text-center p-2">
          <p className={styles['num-style']}>{votes}</p>
        </div>
        <div
          type="button"
          className="row-cols-auto justify-content-center align-self-end text-center p-2"
        >
          <i
            className={cx('bi bi-dash', styles['btn-sign-style'])}
            onClick={() => {
              handleDownVotes();
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                handleDownVotes();
              }
            }}
            role="button"
          />
        </div>
      </div>
    </div>
  );
}
