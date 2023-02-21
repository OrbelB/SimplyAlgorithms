/* eslint-disable jsx-a11y/label-has-associated-control */
import { NavLink } from 'react-router-dom';
import InputComment from './InputComment';
import Comment from './Comment';

// this is the start of the comment section, which renders the input box and the comment box section
export default function CommentFrame({ passedComments }) {
  return (
    <div className="bg-white mt-5 mb-2">
      <div>
        <label className="h5">
          Have a question? Check our{' '}
          <NavLink className="link-warning" to="/forums">
            forums
          </NavLink>
        </label>
      </div>
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
