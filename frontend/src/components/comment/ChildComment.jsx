import CommentBox from "./CommentBox";

//TODO make users capable to change their comments only
export default function ChildComment({
                                         photo_link, name,
                                         created_at, upVotes,
                                         comment, deleteChildComment,
                                         comment_id, parent_comment_id,
                                         editChildComment, user_id
                                     }) {

    const onDeleteComment = () => {
        deleteChildComment(parent_comment_id, comment_id);
    };

    const onEditComment = (newEditedComment) => {
        editChildComment(newEditedComment, comment_id, user_id);
    };

    return (
        <div className={"container-fluid p-3"}>
            <div className="grid">
                <div className="row">
                    <CommentBox upVotes={upVotes} comment={comment} name={name} deleteParentComment={onDeleteComment}
                                canReply={false} photoLink={photo_link} editComment={onEditComment}
                                createdAt={created_at}/>
            </div>
        </div>
</div>
)
    ;
}