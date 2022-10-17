import Upvotes from "./Upvotes";
import ChildComment from "./ChildComment";
import {useEffect, useState} from "react";
import AddEditComment from "./AddEditComment";
import OptionMenu from "./OptionsMenu";


export default function Comment({
                                    parentId, name, photo_link, comment, created_at, upVotes, replies,
                                    onNewCommentChild, comment_component_id, editComment, deleteParentComment,
                                    deleteChildComment, editChildComment
                                }) {
    const [showReplies, setShowReplies] = useState(false);
    const [inputChildComment, setInputChildComment] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);
    useEffect(() => {

    }, [showReplies]);
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

    const handleIsEditCommentOpen = () => {
        setIsEditClicked(!isEditClicked);

    };

    const handleEditComment = (newComment) => {
        setIsEditClicked(!isEditClicked);
        editComment(newComment, comment_component_id, parentId);
    }
    const handleEditChildComment = (newComment, child_comment_id, child_user_id) => {
        editChildComment(newComment, child_comment_id, child_user_id, comment_component_id);
    }

    return (
        <>
            <div className={"container-fluid p-4"}>
                <div className="grid">
                    <div className="row justify-content-center">
                        <div className="col-auto col-sm-auto col-lg-1 p-2 p-lg-0 p-sm-0 p-md-0">
                            <Upvotes upVotes={upVotes}/>
                        </div>
                        <div className="col me-lg-5 me-auto">
                            <div className="row">
                                <div className="col-auto col-sm-auto m-1">
                                    <img
                                        src={photo_link}
                                        className="rounded-circle"
                                        height="45"
                                        alt="profile user"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="col-auto me-1">
                                    <p className={"text-primary"}>{name}</p>
                                </div>
                                <div className="col-auto me-lg-auto me-md-auto">
                                    <p className={"text-secondary"}>{created_at}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between mt-2">
                                <div className={"col-auto col-sm-auto m-2 p-1 col-lg-10"}>
                                    {isEditClicked ?
                                        <AddEditComment handleAddEditComment={handleEditComment} photo_link={photo_link}
                                                        comment={comment}
                                                        cancelReplyElement={handleIsEditCommentOpen}/> :
                                        <p className={"text-wrap"}>{comment}</p>}
                                </div>
                                <div className={"col-auto align-items-center p-3 p-lg-0 p-md-0"}>
                                    <OptionMenu handleDeleteMessage={handleDeleteMessage}
                                                handleIsEditCommentOpen={handleIsEditCommentOpen}
                                                handleCancelComment={handleCancelComment} canReply={true}/>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}