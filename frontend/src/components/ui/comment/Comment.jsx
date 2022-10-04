import Upvotes from "./Upvotes";
import ChildComment from "./ChildComment";
import {useEffect, useState} from "react";
import AddEditComment from "./AddEditComment";


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
        //TODO
        setInputChildComment(!inputChildComment);
    };

    const getChildComment = (passedChildComment) => {
        //TODO
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
            <div className={"container-fluid p-3"}>
                <div className="grid">
                    <div className="row justify-content-center">
                        <div className="col-sm-2">
                            <Upvotes upVotes={upVotes}/>
                        </div>
                        <div className="col me-lg-5">
                            <div className="row">
                                <div className="col-sm-auto">
                                    <img
                                        src={photo_link}
                                        className="rounded-circle"
                                        height="40"
                                        alt="Black and White Portrait of a Man"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="col-auto">
                                    <p className={"text-primary"}>{name}</p>
                                </div>
                                <div className="col-auto me-lg-auto">
                                    <p className={"text-secondary"}>{created_at}</p>
                                </div>
                                <div className="col-sm-auto">
                                    <button className={"btn btn-outline-primary bi bi-trash text-danger"}
                                            onClick={handleDeleteMessage}>{" "}Delete
                                    </button>
                                </div>
                                <div className="col-sm-auto ">
                                    <button className={"btn btn-outline-primary bi bi-pencil-fill"}
                                            onClick={handleIsEditCommentOpen} type={"button"}> Edit
                                    </button>
                                </div>
                                <div className="col-sm-auto">
                                    <button
                                        className={"btn btn-outline-primary bi bi-arrow-return-left text-info"}
                                        onClick={handleCancelComment}
                                    >{" "}Reply
                                    </button>
                                </div>
                            </div>
                            <div className="row justify-content-start mt-2">
                                {isEditClicked ?
                                    <AddEditComment handleAddEditComment={handleEditComment} photo_link={photo_link}
                                                    comment={comment} cancelReplyElement={handleIsEditCommentOpen}/> :
                                    <p>{comment}</p>}
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
                                        {!showReplies ? <a className={"btn  bi bi-caret-down"} type={"button"}
                                                           onClick={handleShowReplies}>{" " + replies.length + " "} replies</a> :
                                            <a className={"btn bi bi-caret-up"} type={"button"}
                                               onClick={handleShowReplies}>{" " + replies.length + " "} replies</a>}
                                    </div>
                                </div>
                            }
                            {hasReplies &&
                                <div className={"row"}>
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