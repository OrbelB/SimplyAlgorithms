import React, { useState } from 'react';
import cx from 'classnames';
import { BiLike, BiDislike } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVotes, voteForum, deleteForumVote } from '../../services/forum';
import fp from './vote.module.css';
import { selectByForumVoteId } from '../../store/reducers/forum-votes-reducer';

// TODO fix forum vote not working properly
export default function Vote({ like_, dislike_ }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useSelector((state) => state.forumVotes);
  const {
    isLoggedIn,
    jwtAccessToken,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const { forum } = useSelector((state) => state.forum);
  const currentUserHasVoted = useSelector((state) =>
    selectByForumVoteId(state, {
      pageId: forum?.pageId,
      userId: authUserId,
    })
  );

  if (status === 'idle' && isLoggedIn) {
    dispatch(
      fetchVotes({ pageId: forum?.pageId, accessToken: jwtAccessToken })
    );
  }

  const [like, setlike] = useState(like_);
  const [dislike, setdislike] = useState(dislike_);
  const [likeActive, setLikeActive] = useState(!!currentUserHasVoted);
  const [dislikeActive, setdisLikeActive] = useState(!!currentUserHasVoted);
  const likeForum = () => {
    if (!isLoggedIn && jwtAccessToken === '') {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (likeActive) {
      dispatch(
        deleteForumVote({
          pageId: forum.pageId,
          userId: authUserId,
          accessToken: jwtAccessToken,
        })
      );
      setLikeActive(false);
      setlike(like - 1);
    } else {
      dispatch(
        voteForum({
          voteObject: {
            pageId: forum.pageId,
            userId: authUserId,
            likeDislike: true,
          },
          accessToken: jwtAccessToken,
        })
      );
      setLikeActive(true);
      setlike(like + 1);
      if (dislikeActive) {
        dispatch(
          voteForum({
            voteObject: {
              pageId: forum.pageId,
              userId: authUserId,
              likeDislike: true,
            },
            accessToken: jwtAccessToken,
          })
        );
        setdisLikeActive(false);
        setlike(like + 1);
        setdislike(dislike - 1);
      }
    }
  };

  const dislikeForum = () => {
    if (!isLoggedIn && jwtAccessToken === '') {
      navigate('/login', { state: { from: location } });
      return;
    }
    // if there is a like
    if (dislikeActive) {
      dispatch(
        deleteForumVote({
          pageId: forum.pageId,
          userId: authUserId,
          accessToken: jwtAccessToken,
        })
      );
      setdisLikeActive(false);
      setdislike(dislike - 1);
    } else {
      dispatch(
        voteForum({
          voteObject: {
            pageId: forum.pageId,
            userId: authUserId,
            likeDislike: false,
          },
          accessToken: jwtAccessToken,
        })
      );
      setdisLikeActive(true);
      setdislike(dislike + 1);
      if (likeActive) {
        dispatch(
          voteForum({
            voteObject: {
              pageId: forum.pageId,
              userId: authUserId,
              likeDislike: true,
            },
            accessToken: jwtAccessToken,
          })
        );
        setLikeActive(false);
        setlike(dislike + 1);
        setlike(like - 1);
      }
    }
  };

  return (
    <div
      className={cx(
        fp.vote,
        'row m-3 p-2 justify-content-around align-items-center self-align-center border rounded-pill bg-info bg-opacity-50'
      )}
    >
      <button
        onClick={likeForum}
        className={cx(fp.ld, 'col-auto')}
        type="button"
      >
        <BiLike /> {` ${like}`}
      </button>
      <button
        onClick={dislikeForum}
        className={cx(fp.ld, 'col-auto')}
        type="button"
      >
        <BiDislike /> {` ${dislike}`}
      </button>
    </div>
  );
}
