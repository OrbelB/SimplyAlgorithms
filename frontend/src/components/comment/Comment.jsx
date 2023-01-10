/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChildComment from './ChildComment';
import AddEditComment from './AddEditComment';
import CommentBox from './CommentBox';
import {
  fetchChildrenComments,
  deleteParentComment,
  updateParentComment,
  createChildComment,
  updateChildComment,
  deleteChildComment,
} from '../../services/comment';
import { selectChildrenCommentsByParentCommentId } from '../../store/reducers/comment-reducer';
import { forumActions } from '../../store/reducers/forum-reducer';

// main comment section; shows all the parent comments
export default function Comment({
  userId,
  username,
  profilePicture,
  commentText,
  createdDate,
  upVotes,
  replies = [], // will be removed
  replyCount,
  parentCommentId,
  downVotes,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [inputChildComment, setInputChildComment] = useState(false);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const pageId = useSelector((state) => state.forum.forum.pageId);
  const dispatch = useDispatch();
  const hasReplies = showReplies && replyCount > 0;
  const childrenComments = useSelector((state) =>
    selectChildrenCommentsByParentCommentId(state, parentCommentId)
  );
  const handleShowReplies = () => {
    dispatch(
      fetchChildrenComments({
        page: 0,
        size: 10,
        parentCommentId,
      })
    );
    setShowReplies(!showReplies);
  };

  const handleCancelComment = () => {
    setInputChildComment(!inputChildComment);
  };

  // creates the child comment
  const getChildComment = (passedChildComment) => {
    setInputChildComment(!inputChildComment);
    dispatch(
      createChildComment({
        parentCommentId,
        childComment: {
          pageId,
          commentText: passedChildComment,
          userId: authUserId,
        },
        accessToken: jwtAccessToken,
      })
    );
    dispatch(forumActions.addSingleReply({ commentId: parentCommentId }));
  };

  // deletes parent comment
  const handleDeleteMessage = () => {
    dispatch(
      deleteParentComment({
        userId,
        accessToken: jwtAccessToken,
        commentId: parentCommentId,
      })
    );
  };

  // deletes child comment
  const handleDeleteChildComment = (childUserId, commentId) => {
    dispatch(
      deleteChildComment({
        childUserId,
        accessToken: jwtAccessToken,
        commentId,
      })
    );
    // updates reply count from the forum object
    dispatch(forumActions.removeSingleReply({ commentId: parentCommentId }));
  };

  // edits the  parent comment
  const handleEditComment = (newComment) => {
    dispatch(
      updateParentComment({
        commentToUpdate: {
          commentId: parentCommentId,
          pageId,
          commentText: newComment,
          userId,
        },
        accessToken: jwtAccessToken,
      })
    );
  };

  // edits the child comment
  const handleEditChildComment = (newComment, childCommentId, childUserId) => {
    dispatch(
      // only users authenticated and who created the comment can update
      updateChildComment({
        commentToUpdate: {
          commentId: childCommentId,
          pageId,
          commentText: newComment,
          childUserId,
        },
        accessToken: jwtAccessToken,
      })
    );
  };

  return (
    <div className="container-fluid p-4">
      <div className="grid">
        <div className="row justify-content-center">
          <CommentBox
            commentId={parentCommentId}
            userId={userId}
            commentText={commentText}
            cancelComment={handleCancelComment}
            editComment={handleEditComment}
            username={username}
            upVotes={upVotes}
            downVotes={downVotes}
            deleteParentComment={handleDeleteMessage}
            createdDate={createdDate}
            profilePicture={profilePicture}
          >
            {inputChildComment && (
              <AddEditComment
                handleAddEditComment={getChildComment}
                cancelReplyElement={handleCancelComment}
              />
            )}
            {replyCount > 0 && (
              <div className="row">
                <div className="col-sm-auto">
                  <i
                    className={`btn bi bi-caret-${
                      showReplies ? 'up' : 'down'
                    } font-weight-normal`}
                    role="button"
                    onClick={handleShowReplies}
                  >
                    {` ${replyCount} `}
                    {replies.length === 1 ? 'reply' : 'replies'}
                  </i>
                </div>
              </div>
            )}
            {hasReplies && (
              <div className="row m-0 p-0">
                {childrenComments?.map(({ comment }) => (
                  <ChildComment
                    key={comment.commentId}
                    commentText={comment?.commentText}
                    commentId={comment.commentId}
                    createdDate={comment.createdDate}
                    profilePicture={comment?.createdBy?.profilePicture}
                    userId={comment?.createdBy?.userId}
                    username={comment?.createdBy?.username}
                    upVotes={comment?.likes}
                    downVotes={comment?.dislikes}
                    deleteChildComment={handleDeleteChildComment}
                    editChildComment={handleEditChildComment}
                  />
                ))}
              </div>
            )}
          </CommentBox>
        </div>
      </div>
    </div>
  );
}
