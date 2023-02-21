import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import fp from './ForumPost.module.css';
import { forumsActions } from '../../../store/reducers/forums-reducer';
import CommentFrame from '../../comment/CommentFrame';

import {
  fetchSingleForum,
  addUserView,
  fetchVotes,
} from '../../../services/forum';
import beautifyTime from '../../../utilities/beautify-time';
import Vote from '../../vote_comp/Vote';
import ForumOptionMenu from './ForumOptionMenu';
import LoadingBackdrop from '../../loading/LoadingBackdrop';
import { listVotesByPage } from '../../../services/comment';
import useUpdateStore from '../../../hooks/use-updateStore';
import { viewForumsActions } from '../../../store/reducers/viewed-forums-reducer';

export default function ForumPost() {
  const { pageId } = useParams();

  const {
    jwtAccessToken,
    isLoggedIn,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const { status, forum } = useSelector((state) => state.forum);
  const { status: viewStatus } = useSelector((state) => state.viewedForums);
  const { status: commentVoteStatus } = useSelector(
    (state) => state.commentVotes
  );
  const { status: forumVoteStatus } = useSelector((state) => state.forumVotes);

  const forumUpdateStore = useMemo(() => {
    return {
      conditions: [
        status === 'idle' || status === 'successToIdle',
        (viewStatus === 'success' || viewStatus === 'failed') &&
          jwtAccessToken !== '' &&
          isLoggedIn &&
          (status === 'success' || status === 'completed'),
      ],
      actions: [
        [fetchSingleForum],
        [forumsActions.updateForum, addUserView, viewForumsActions.resetData],
      ],
      arguments: [
        [pageId],
        [
          { forum },
          { pageId, userId: authUserId, accessToken: jwtAccessToken },
        ],
      ],
    };
  }, [
    authUserId,
    forum,
    isLoggedIn,
    jwtAccessToken,
    pageId,
    status,
    viewStatus,
  ]);

  useUpdateStore(
    forumUpdateStore.conditions,
    forumUpdateStore.actions,
    forumUpdateStore.arguments
  );

  const commentVoteUpdateStore = useMemo(() => {
    return {
      conditions: [
        commentVoteStatus === 'idle' &&
          jwtAccessToken !== '' &&
          isLoggedIn &&
          authUserId !== '' &&
          pageId !== '',
      ],
      actions: [[listVotesByPage]],
      arguments: [
        [
          {
            pageId,
            userId: authUserId,
          },
        ],
      ],
    };
  }, [authUserId, commentVoteStatus, isLoggedIn, jwtAccessToken, pageId]);

  useUpdateStore(
    commentVoteUpdateStore.conditions,
    commentVoteUpdateStore.actions,
    commentVoteUpdateStore.arguments
  );

  const forumVoteUpdateStore = useMemo(() => {
    return {
      conditions: [forumVoteStatus === 'idle' && isLoggedIn],
      actions: [[fetchVotes]],
      arguments: [
        [
          {
            pageId,
            accessToken: jwtAccessToken,
            userId: authUserId,
          },
        ],
      ],
    };
  }, [authUserId, forumVoteStatus, isLoggedIn, jwtAccessToken, pageId]);

  useUpdateStore(
    forumVoteUpdateStore.conditions,
    forumVoteUpdateStore.actions,
    forumVoteUpdateStore.arguments
  );

  if (status === 'loading') {
    return <LoadingBackdrop />;
  }
  if (status === 'success' || status === 'completed') {
    return (
      <div key={pageId} className={cx(fp.window)}>
        <div>
          <div
            className={cx(
              fp.post,
              'border border-success p-2 rounded-bottom rounded-4 border-info bg-light text-dark bg-opacity-50 h-auto d-inline-block'
            )}
          >
            <div className="row">
              <div className="col pt-2 d-flex justify-content-end">
                <ForumOptionMenu
                  userId={forum?.userDto?.userId}
                  pageId={forum?.pageId}
                />
              </div>
            </div>
            <div className={cx(fp.user)}>
              <div className="row">
                <div className={cx(fp.postedBorderupper, 'col-auto col-md-2')}>
                  Posted By: {forum?.userDto?.username}
                </div>
              </div>
              <div className="row">
                <div className={cx(fp.postBorderBottom, 'col-auto col-md-2')}>
                  Posted: {beautifyTime({ createdDate: forum?.createdDate })}
                </div>
              </div>
            </div>
            <h3 className={cx(fp.title)}>{forum?.title}</h3>
            <div className="row d-flex justify-content-center">
              {forum?.tags.map((tag) => (
                <Chip
                  key={tag.tagId}
                  className="col-auto me-2 ms-2"
                  label={tag.tag}
                  color="primary"
                />
              ))}
            </div>
            <div className={cx(fp.quetion, 'overflow-auto fw-normal lh-base')}>
              {forum?.descriptionText}
            </div>
            <Vote
              like_={forum?.upVotes}
              dislike_={forum?.downVotes}
              user_voted_={forum?.upVotes > 0 || forum.downVotes > 0}
            />
          </div>
        </div>
        <div>
          <CommentFrame passedComments={forum?.comments} page={forum?.pageId} />
        </div>
      </div>
    );
  }
}

// {/* bootstrap border-{thikness number 1 - 5} border-{top bottom right left or if its a box just put border}  */}
