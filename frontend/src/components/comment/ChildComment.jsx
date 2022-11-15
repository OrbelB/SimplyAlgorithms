import CommentBox from "./CommentBox";

//TODO make users capable to change their comments only
export default function ChildComment({
  profilePicture,
  username,
  createdDate,
  upVotes,
  downVotes,
  commentText,
  deleteChildComment,
  commentId,
  parentCommentId,
  editChildComment,
  userId,
}) {
  const onDeleteComment = () => {
    deleteChildComment(userId, commentId);
  };

  const onEditComment = (newEditedComment) => {
    editChildComment(newEditedComment, commentId, userId);
  };

  return (
    <div className={"container-fluid p-3"}>
      <div className="grid">
        <div className="row">
          <CommentBox
            userId={userId}
            upVotes={upVotes}
            downVotes={downVotes}
            commentText={commentText}
            username={username}
            deleteParentComment={onDeleteComment}
            canReply={false}
            profilePicture={profilePicture}
            editComment={onEditComment}
            createdDate={createdDate}
          />
        </div>
      </div>
    </div>
  );
}
