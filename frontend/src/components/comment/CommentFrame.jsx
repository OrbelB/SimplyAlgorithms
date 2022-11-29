import { NavLink } from "react-router-dom";
import InputComment from "./InputComment";
import Comment from "./Comment";

const staticComments = [
  {
    id: "unique_id_0",
    comment_id: "unique_comment_id_0",
    name: "temp",
    photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
    comment:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. " +
      "You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    created_at: "2 months ago",
    upVotes: 0,
    replies: [
      {
        id: "unique_id_1",
        comment_id: "unique_comment_id_1",
        name: "Harry",
        photo: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        comment:
          "If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
        created_at: "2 months ago",
        upVotes: 0,
      },
    ],
  },
];

export default function CommentFrame({ passedComments, pageId }) {
  return (
    <div className="bg-white mt-5 mb-2">
      <div>
        <label className="h5">
          Have a question? Check our{" "}
          {
            <NavLink className={"link-warning"} to={"/forums"}>
              forums
            </NavLink>
          }
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
          replies={comment?.replies} //will remove
        />
      ))}
    </div>
  );
}
