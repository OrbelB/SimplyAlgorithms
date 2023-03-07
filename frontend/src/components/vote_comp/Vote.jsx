import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { BiLike, BiDislike } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { voteForum, deleteForumVote } from '../../services/forum';
import fp from './vote.module.css';
import { selectByForumVoteId } from '../../store/reducers/forum-vote-reducer';

// TODO fix forum vote not working properly
export default function Vote({ like_, dislike_ }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoggedIn,
    jwtAccessToken,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const { forum } = useSelector((state) => state.forum);

  const userVote = useSelector((state) =>
    selectByForumVoteId(state, { userId: authUserId, pageId: forum.pageId })
  );

  const [like, setlike] = useState(like_);
  const [dislike, setdislike] = useState(dislike_);

  const likeActive = useMemo(() => {
    return userVote !== undefined && userVote.likeDislike;
  }, [userVote]);

  const dislikeActive = useMemo(() => {
    return userVote !== undefined && !userVote.likeDislike;
  }, [userVote]);

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
        setlike(dislike + 1);
        setlike(like - 1);
      }
    }
  };

  return (
    <div
      className={cx(
        fp.vote,
        'row m-3 justify-content-around align-items-center self-align-center'
      )}
    >
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={likeForum}
        className={cx(fp.ld, 'm-1 col-auto rounded-pill')}
        type="button"
      >
        <BiLike /> {` ${like}`}
      </Button>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={dislikeForum}
        className={cx(fp.ld, 'm-1 col-auto rounded-pill')}
        type="button"
      >
        <BiDislike /> {` ${dislike}`}
      </Button>
    </div>
  );
}
