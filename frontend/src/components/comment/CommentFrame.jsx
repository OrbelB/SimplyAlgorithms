/* eslint-disable jsx-a11y/label-has-associated-control */
import InputComment from './InputComment';
import Comment from './Comment';

// this is the start of the comment section, which renders the input box and the comment box section
export default function CommentFrame({ passedComments }) {
  return (
    <div className="bg-white mt-5 mb-2">
      <InputComment />
      {passedComments.map((comment) => (
        <Comment
          key={comment?.commentId}
          userId={comment?.createdBy?.userId}
          username={comment?.createdBy?.username}
          parentCommentId={comment?.commentId}
          profilePicture={comment?.createdBy?.profilePicture}
          commentText={comment?.commentText}
          createdDate={comment?.createdDate}
          upVotes={comment?.likes}
          downVotes={comment?.dislikes}
          replyCount={comment?.replyCount}
          replies={comment?.replies} // will remove?
        />
      ))}
    </div>
  );
}
