import React, { useEffect } from "react";
import cx from "classnames";
import { BiLike, BiDislike } from "react-icons/bi";
import fp from "./vote.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllForumVotes,
  selectByForumVoteId,
} from "../../store/reducers/forum-votes-reducer";
import { fetchVotes, voteForum, deleteForumVote } from "../../services/forum";
import { current } from "@reduxjs/toolkit";

export default function Vote({ like_, dislike_, user_voted_ }) {
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

  if (status === "idle" && isLoggedIn) {
    dispatch(
      fetchVotes({ pageId: forum?.pageId, accessToken: jwtAccessToken })
    );
  }

  const [like, setlike] = useState(like_);
  const [dislike, setdislike] = useState(dislike_);
  const [likeActive, setLikeActive] = useState(
    !currentUserHasVoted ? false : true
  );
  const [dislikeActive, setdisLikeActive] = useState(
    !currentUserHasVoted ? false : true
  );
  const like_forum = () => {
    if (!isLoggedIn && jwtAccessToken === "") {
      navigate("/login", { state: { from: location } });
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

  const dislike_forum = () => {
    if (!isLoggedIn && jwtAccessToken === "") {
      navigate("/login", { state: { from: location } });
      return;
    }
    //if there is a like
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
        fp["vote"],
        "row m-3 p-2 justify-content-around align-items-center self-align-center border rounded-pill bg-info bg-opacity-50"
      )}
    >
      <button onClick={like_forum} className={cx(fp["ld"], "col-auto")}>
        <BiLike /> {" " + like}
      </button>
      <button onClick={dislike_forum} className={cx(fp["ld"], "col-auto")}>
        <BiDislike /> {" " + dislike}
      </button>
    </div>
  );
}
