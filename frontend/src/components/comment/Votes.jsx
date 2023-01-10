/* eslint-disable jsx-a11y/control-has-associated-label */
import cx from 'classnames';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { voteComment, deleteCommentVote } from '../../services/comment';

import styles from './Upvotes.module.css';

// TODO fixed votes not working properly
export default function Votes({
  commentId,
  upVotes,
  downVotes,
  currentUserVote,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [votes, setVotes] = useState(upVotes - downVotes);
  // const [updateCurrentUser, setUpdateCurrentUser] = useState(false);
  const {
    userId: authUserID,
    jwtAccessToken,
    isLoggedIn,
  } = useSelector((state) => state.auth);
  useEffect(() => {}, [currentUserVote]);
  // const { forum } = useSelector((state) => state.forum);
  // const allCommentVotes = useSelector(selectAllCommentVotes);

  // const currentUserVote = useSelector((state) =>
  //   selectByCommentVoteId(state, {
  //     commentVoteId: {
  //       userId: authUserID,
  //       commentId: commentId,
  //     },
  //   })
  // );
  //
  //
  // const { status, error } = useSelector((state) => state.commentVotes);

  // useEffect(() => {

  //   if (status === "idle") {
  //     dispatch(
  //       listVotesByComment({
  //         pageId: forum?.pageId,
  //       })
  //     );
  //   }
  //   console.log(allCommentVotes, "from useEffect");
  // }, [commentId, status, allCommentVotes, dispatch, currentUserVote, forum]);

  const handleUpVotes = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // create the comment if the vote does not exists
    if (
      !currentUserVote ||
      (currentUserVote.commentVoteId.commentId === null &&
        currentUserVote.commentVoteId.userId === null)
    ) {
      dispatch(
        voteComment({
          votedComment: { commentId, userId: authUserID, likeDislike: true },
          accessToken: jwtAccessToken,
        })
      );
      setVotes(votes + 1);
    } else {
      if (
        currentUserVote?.commentVoteId.commentId !== commentId ||
        currentUserVote?.commentVoteId.userId !== authUserID
      ) {
        // dispatch(
        //   voteComment({
        //     votedComment: { commentId, userId: authUserID, likeDislike: true },
        //     accessToken: jwtAccessToken,
        //   })
        // );
        // setVotes(votes + 1);
        return;
      }

      if (currentUserVote.likeDislike === true) {
        dispatch(
          deleteCommentVote({
            userId: authUserID,
            commentId,
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes - 1);
      }
      if (currentUserVote.likeDislike === false) {
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

  const handleDownVotes = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // create a vote if the vote does not exists
    if (
      !currentUserVote ||
      (currentUserVote.commentVoteId.commentId === null &&
        currentUserVote.commentVoteId.userId === null)
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
        currentUserVote?.commentVoteId.commentId !== commentId ||
        currentUserVote?.commentVoteId.userId !== authUserID
      ) {
        // dispatch(
        //   voteComment({
        //     votedComment: { commentId, userId: authUserID, likeDislike: false },
        //     accessToken: jwtAccessToken,
        //   })
        // );
        // setVotes(votes - 1);
        return;
      }
      // remove the vote if it exists when liked
      if (currentUserVote.likeDislike === false) {
        dispatch(
          deleteCommentVote({
            userId: authUserID,
            commentId,
            accessToken: jwtAccessToken,
          })
        );
        setVotes(votes + 1);
      }
      if (currentUserVote.likeDislike === true) {
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
            onClick={handleUpVotes}
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
            onClick={handleDownVotes}
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
