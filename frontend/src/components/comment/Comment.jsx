import ChildComment from "./ChildComment";
import {useState} from "react";
import AddEditComment from "./AddEditComment";
import CommentBox from "./CommentBox";

export default function Comment({
                                    parentId, name, photo_link, comment, created_at, upVotes, replies,
                                    onNewCommentChild, comment_component_id, editComment, deleteParentComment,
                                    deleteChildComment, editChildComment
                                }) {

    const [showReplies, setShowReplies] = useState(false);
    const [inputChildComment, setInputChildComment] = useState(false);

    const hasReplies = showReplies && replies.length > 0;

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleCancelComment = () => {
        setInputChildComment(!inputChildComment);
    };

    const getChildComment = (passedChildComment) => {
        setInputChildComment(!inputChildComment);
        onNewCommentChild(passedChildComment, parentId, comment_component_id, name, photo_link);
    };

    const handleDeleteMessage = () => {
        deleteParentComment(comment_component_id, parentId);
    };

    const handleEditComment = (newComment) => {
        editComment(newComment, comment_component_id, parentId);
    };

    const handleEditChildComment = (newComment, child_comment_id, child_user_id) => {
        editChildComment(newComment, child_comment_id, child_user_id, comment_component_id);
    };

    return (
        <div className={"container-fluid p-4"}>
            <div className="grid">
                <div className="row justify-content-center">
                    <CommentBox comment={comment} cancelComment={handleCancelComment}
                                editComment={handleEditComment} name={name} upVotes={upVotes}
                                deleteParentComment={handleDeleteMessage} createdAt={created_at}
                                photoLink={photo_link}>
                        {inputChildComment &&
                            <AddEditComment handleAddEditComment={getChildComment}
                                            cancelReplyElement={handleCancelComment}
                                            photo_link={photo_link}/>
                        }
                        {replies.length
                            > 0 &&
                            <div className={"row "}>
                                <div className={"col-sm-auto"}>
                                    <i className={`btn bi bi-caret-${showReplies ? 'up' : 'down'} font-weight-normal`}
                                       role={"button"}
                                       onClick={handleShowReplies}>{" " + replies.length + " "}
                                        {replies.length === 1 ? "reply" : "replies"}
                                    </i>
                                </div>
                            </div>
                        }
                        {hasReplies &&
                            <div className={"row m-0 p-0"}>
                                {replies.map((reply) => (
                                    <ChildComment key={reply.comment_id} comment={reply.comment}
                                                  comment_id={reply.comment_id}
                                                  parent_comment_id={comment_component_id}
                                                  created_at={reply.created_at} photo_link={reply.photo}
                                                  user_id={reply.id}
                                                  name={reply.name} upVotes={upVotes}
                                                  deleteChildComment={deleteChildComment}
                                                  editChildComment={handleEditChildComment}
                                    />
                                ))
                                }
                            </div>
                        }
                    </CommentBox>
                </div>
            </div>
        </div>
    );
}