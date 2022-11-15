import ChildComment from "./ChildComment";
import { useState } from "react";
import AddEditComment from "./AddEditComment";
import CommentBox from "./CommentBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChildrenComments,
  deleteParentComment,
  updateParentComment,
  createChildComment,
  updateChildComment,
  deleteChildComment,
} from "../../services/comment";
import { selectChildrenCommentsByParentCommentId } from "../../store/reducers/comment-reducer";
import { forumActions } from "../../store/reducers/forum-reducer";
export default function Comment({
  userId,
  username,
  profilePicture,
  commentText,
  createdDate,
  upVotes,
  replies = [], //will be removed
  replyCount,
  parentCommentId,
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
        parentCommentId: parentCommentId,
      })
    );
    setShowReplies(!showReplies);
  };

  const handleCancelComment = () => {
    setInputChildComment(!inputChildComment);
  };

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

  const handleDeleteMessage = () => {
    dispatch(
      deleteParentComment({
        userId: userId,
        accessToken: jwtAccessToken,
        commentId: parentCommentId,
      })
    );
  };

  const handleDeleteChildComment = (userId, commentId) => {
    dispatch(
      deleteChildComment({
        userId: userId,
        accessToken: jwtAccessToken,
        commentId: commentId,
      })
    );
    dispatch(forumActions.removeSingleReply({ commentId: parentCommentId }));
  };

  const handleEditComment = (newComment) => {
    dispatch(
      updateParentComment({
        commentToUpdate: {
          commentId: parentCommentId,
          pageId: pageId,
          commentText: newComment,
          userId: userId,
        },
        accessToken: jwtAccessToken,
      })
    );
  };

  const handleEditChildComment = (newComment, childCommentId, userId) => {
    dispatch(
      //only users authenticated and who created the comment can update
      updateChildComment({
        commentToUpdate: {
          commentId: childCommentId,
          pageId: pageId,
          commentText: newComment,
          userId: userId,
        },
        accessToken: jwtAccessToken,
      })
    );
  };

  return (
    <div className={"container-fluid p-4"}>
      <div className="grid">
        <div className="row justify-content-center">
          <CommentBox
            userId={userId}
            commentText={commentText}
            cancelComment={handleCancelComment}
            editComment={handleEditComment}
            username={username}
            upVotes={upVotes}
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
              <div className={"row "}>
                <div className={"col-sm-auto"}>
                  <i
                    className={`btn bi bi-caret-${
                      showReplies ? "up" : "down"
                    } font-weight-normal`}
                    role={"button"}
                    onClick={handleShowReplies}
                  >
                    {" " + replyCount + " "}
                    {replies.length === 1 ? "reply" : "replies"}
                  </i>
                </div>
              </div>
            )}
            {hasReplies && (
              <div className={"row m-0 p-0"}>
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
