import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import fp from './ForumPost.module.css';
import { forumsActions } from '../../../store/reducers/forums-reducer';
import CommentFrame from '../../comment/CommentFrame';
import { fetchSingleForum, addUserView } from '../../../services/forum';
import beautifyTime from '../../../utilities/beautify-time';
import Vote from '../../vote_comp/Vote';
import ForumOptionMenu from './ForumOptionMenu';
import LoadingBackdrop from '../../loading/LoadingBackdrop';
import { listVotesByPage } from '../../../services/comment';

export default function ForumPost() {
  const { pageId } = useParams();

  const {
    jwtAccessToken,
    isLoggedIn,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { status, forum } = useSelector((state) => state.forum);
  const { status: viewStatus } = useSelector((state) => state.viewedForums);
  const { status: commentVoteStatus } = useSelector(
    (state) => state.commentVotes
  );
  useEffect(() => {
    if (status === 'idle' || status === 'successToIdle') {
      dispatch(fetchSingleForum(pageId));
    }
    if (
      viewStatus === 'success' &&
      jwtAccessToken !== '' &&
      isLoggedIn &&
      (status === 'success' || status === 'completed')
    ) {
      dispatch(forumsActions.updateForum({ forum }));
      dispatch(
        addUserView({
          pageId,
          userId: authUserId,
          accessToken: jwtAccessToken,
        })
      );
      // dispatch(viewForumsActions.updateForum({ forum: forum }));
    }
  }, [
    status,
    pageId,
    dispatch,
    authUserId,
    isLoggedIn,
    jwtAccessToken,
    forum,
    viewStatus,
  ]);

  useEffect(() => {
    if (
      commentVoteStatus === 'idle' &&
      jwtAccessToken !== '' &&
      isLoggedIn &&
      authUserId !== '' &&
      pageId !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId,
          userId: authUserId,
        })
      );
    }
  }, [
    authUserId,
    dispatch,
    isLoggedIn,
    jwtAccessToken,
    pageId,
    commentVoteStatus,
  ]);

  if (status === 'loading') {
    return <LoadingBackdrop />;
  }
  if (status === 'success' || status === 'completed') {
    return (
      <div key={pageId} className={cx(fp.window, 'container-fluid')}>
        <div>
          {/* <div className={cx(fp["side2"])}>
            <h1 className={cx(fp["category-label"])}>Related Posts</h1>
            <div className={cx(fp["related-posts"])}>
            </div>
          </div> */}
          <div
            className={cx(
              fp.post,
              'border border-success p-2 rounded-bottom rounded-4 border-info bg-secondary text-dark bg-opacity-50 h-auto d-inline-block'
            )}
          >
            <div className={cx(fp.user)}>
              <div className="row">
                <div className="col-auto col-md-3">
                  {forum?.userDto?.username}
                </div>
                {forum?.tags.map((tag) => (
                  <Chip
                    key={tag.tagId}
                    className="col-auto me-2 ms-2"
                    label={tag.tag}
                    color="primary"
                  />
                ))}
                <div className="col-auto ms-md-5">
                  {beautifyTime({ createdDate: forum?.createdDate })}
                </div>
                <div className="col d-flex justify-content-end">
                  <ForumOptionMenu
                    userId={forum?.userDto?.userId}
                    pageId={forum?.pageId}
                  />
                </div>
              </div>
            </div>
            <h3 className={cx(fp.title)}>{forum?.title}</h3>
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
