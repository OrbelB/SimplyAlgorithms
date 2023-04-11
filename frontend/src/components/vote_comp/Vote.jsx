import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { BiLike, BiDislike } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import fp from './vote.module.css';

export default function Vote({
  like_,
  dislike_,
  pageId,
  votePage,
  status,
  deleteVote,
  selectByVoteId = () => {},
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoggedIn,
    jwtAccessToken,
    userId: authUserId,
  } = useSelector((state) => state.auth);

  const userVote = useSelector((state) =>
    selectByVoteId(state, { userId: authUserId, pageId })
  );

  const [like, setlike] = useState(like_);
  const [dislike, setdislike] = useState(dislike_);

  const likeActive = useMemo(() => {
    return userVote !== undefined && userVote?.likeDislike === true;
  }, [userVote]);

  const dislikeActive = useMemo(() => {
    return userVote !== undefined && userVote?.likeDislike === false;
  }, [userVote]);

  const likeForum = async () => {
    if (!isLoggedIn && jwtAccessToken === '') {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (likeActive) {
      try {
        await dispatch(
          deleteVote({
            pageId,
            userId: authUserId,
            accessToken: jwtAccessToken,
          })
        ).unwrap();
      } finally {
        if (status !== 'failed') {
          setlike(like - 1);
        }
      }
    } else {
      if (dislikeActive) {
        try {
          await dispatch(
            votePage({
              voteObject: {
                pageId,
                userId: authUserId,
                likeDislike: true,
              },
              accessToken: jwtAccessToken,
            })
          ).unwrap();
        } finally {
          if (status !== 'failed') {
            setlike(like + 1);
            setdislike(dislike - 1);
          }
        }
      }
      try {
        await dispatch(
          votePage({
            voteObject: {
              pageId,
              userId: authUserId,
              likeDislike: true,
            },
            accessToken: jwtAccessToken,
          })
        ).unwrap();
      } finally {
        if (status !== 'failed') {
          setlike(like + 1);
        }
      }
    }
  };

  const dislikeForum = async () => {
    if (!isLoggedIn && jwtAccessToken === '') {
      navigate('/login', { state: { from: location } });
      return;
    }
    // if there is a like
    if (dislikeActive) {
      try {
        dispatch(
          deleteVote({
            pageId,
            userId: authUserId,
            accessToken: jwtAccessToken,
          })
        ).unwrap();
      } finally {
        if (status !== 'failed') {
          setdislike(dislike - 1);
        }
      }
    } else {
      if (likeActive) {
        try {
          dispatch(
            votePage({
              voteObject: {
                pageId,
                userId: authUserId,
                likeDislike: true,
              },
              accessToken: jwtAccessToken,
            })
          ).unwrap();
        } finally {
          if (status !== 'failed') {
            setdislike(dislike + 1);
            setlike(like - 1);
          }
        }
      }
      try {
        dispatch(
          votePage({
            voteObject: {
              pageId,
              userId: authUserId,
              likeDislike: false,
            },
            accessToken: jwtAccessToken,
          })
        ).unwrap();
      } finally {
        if (status !== 'failed') {
          setdislike(dislike + 1);
        }
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
        disabled={status === 'loading' || status === 'pending'}
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
        disabled={status === 'loading' || status === 'pending'}
        onClick={dislikeForum}
        className={cx(fp.ld, 'm-1 col-auto rounded-pill')}
        type="button"
      >
        <BiDislike /> {` ${dislike}`}
      </Button>
    </div>
  );
}
