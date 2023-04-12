/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import KeyboardTabRoundedIcon from '@mui/icons-material/KeyboardTabRounded';
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
import {
  commentActions,
  selectChildrenCommentsByParentCommentId,
} from '../../store/reducers/comment-slice';
import AlertSnackBar from '../alert-messages-snackbar/AlertSnackBar';

// main comment section; shows all the parent comments
export default function Comment({
  innerRef,
  userId,
  username,
  profilePicture,
  commentText,
  createdDate,
  upVotes,
  pageId,
  replies = [],
  replyCount,
  roleName,
  parentCommentId,
  downVotes,
}) {
  const { commentChildrenCurrPages, commentChildrenTotalPages, status } =
    useSelector((state) => state.comment);
  const [showReplies, setShowReplies] = useState(false);
  const [inputChildComment, setInputChildComment] = useState(false);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );

  const [fetchMoreChildrenComments, setFetchMoreChildrenComments] =
    useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const hasReplies = showReplies && replyCount > 0;
  const childrenComments = useSelector((state) =>
    selectChildrenCommentsByParentCommentId(state, parentCommentId)
  );

  useEffect(() => {
    if (
      commentChildrenCurrPages.get(parentCommentId) !==
        commentChildrenTotalPages.get(parentCommentId) &&
      fetchMoreChildrenComments
    ) {
      setFetchMoreChildrenComments(true);
      dispatch(
        fetchChildrenComments({
          page: commentChildrenCurrPages.get(parentCommentId),
          size: 10,
          parentCommentId,
        })
      );
    }
  }, [
    commentChildrenCurrPages,
    commentChildrenTotalPages,
    dispatch,
    fetchMoreChildrenComments,
    parentCommentId,
  ]);

  const handleShowReplies = () => {
    if (!showReplies) {
      dispatch(
        fetchChildrenComments({
          page: 0,
          size: 10,
          parentCommentId,
        })
      );
    }
    setShowReplies(!showReplies);
  };

  const handleCancelComment = () => {
    setInputChildComment(!inputChildComment);
  };

  // creates the child comment
  const getChildComment = async (passedChildComment) => {
    try {
      setInputChildComment(!inputChildComment);
      await dispatch(
        createChildComment({
          parentCommentId,
          childComment: {
            pageId,
            commentText: passedChildComment,
            userId: authUserId,
          },
          accessToken: jwtAccessToken,
        })
      ).unwrap();
    } catch (err) {
      setShowErrorMessage(true);
    } finally {
      // updates reply count from the forum object
      // do it only after the comment has been succesfully created
      if (status !== 'failed') {
        dispatch(commentActions.addSingleReply({ commentId: parentCommentId }));
        // dispatch(forumActions.addSingleReply({ commentId: parentCommentId }));
      }
    }
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
  const handleDeleteChildComment = async (childUserId, commentId) => {
    try {
      await dispatch(
        deleteChildComment({
          userId: childUserId,
          accessToken: jwtAccessToken,
          commentId,
        })
      ).unwrap();
    } catch (err) {
      setShowErrorMessage(true);
    } finally {
      // updates reply count from the forum object
      // do it only after the comment has been succesfully delete it
      if (status !== 'failed') {
        dispatch(
          commentActions.removeSingleReply({ commentId: parentCommentId })
          // forumActions.removeSingleReply({ commentId: parentCommentId })
        );
      }
    }
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
          userId: childUserId,
        },
        accessToken: jwtAccessToken,
      })
    );
  };

  return (
    <>
      {showErrorMessage && (
        <AlertSnackBar
          typeMessage="error"
          passedMessage="The server is probably down, try again later"
          removeData={() => setShowErrorMessage(false)}
        />
      )}
      <div className="container-fluid " ref={innerRef}>
        <div className="row p-4 justify-content-center gx-2 g-0">
          <CommentBox
            roleName={roleName}
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
            <div className="row">
              <div className="col-sm-auto m-0 p-0">
                {replyCount > 0 ? (
                  <i
                    className={`btn bi bi-caret-${
                      showReplies ? 'up' : 'down'
                    } font-weight-normal`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.ctrlKey) {
                        handleShowReplies();
                      }
                    }}
                    onClick={handleShowReplies}
                  >
                    {` ${replyCount} `}
                    {replies.length === 1 ? 'reply' : 'replies'}
                  </i>
                ) : (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </div>
            </div>
            {hasReplies && childrenComments.length > 0 && (
              <>
                <div className="row m-0 p-0 g-0 gy-4">
                  {childrenComments?.map(({ comment }) => (
                    <ChildComment
                      roleName={comment?.createdBy?.roleName}
                      key={comment.commentId}
                      commentText={comment?.commentText}
                      commentId={comment.commentId}
                      createdDate={comment.createdDate}
                      profilePicture={comment?.createdBy?.profilePicture}
                      userId={comment?.createdBy?.userId}
                      username={comment?.createdBy?.username}
                      upVotes={comment.likes}
                      downVotes={comment.dislikes}
                      deleteChildComment={handleDeleteChildComment}
                      editChildComment={handleEditChildComment}
                    />
                  ))}
                </div>
                <div
                  className="row m-0 p-0 justify-content-start mt-2"
                  hidden={
                    commentChildrenCurrPages.get(parentCommentId) + 1 >=
                    commentChildrenTotalPages.get(parentCommentId)
                  }
                >
                  <Button
                    component="button"
                    variant="outlined"
                    startIcon={<KeyboardTabRoundedIcon />}
                    disabled={
                      commentChildrenCurrPages.get(parentCommentId) + 1 ===
                        commentChildrenTotalPages.get(parentCommentId) ||
                      status === 'loading'
                    }
                    onClick={() => {
                      dispatch(
                        commentActions.updateCurrentChildrenPage({
                          parentCommentId,
                          commentChildrenCurrPage:
                            commentChildrenCurrPages.get(parentCommentId),
                        })
                      );
                      setFetchMoreChildrenComments(true);
                    }}
                  >
                    show more replies
                  </Button>
                </div>
              </>
            )}
          </CommentBox>
        </div>
      </div>
    </>
  );
}
