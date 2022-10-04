import Upvotes from "./Upvotes";
import ChildComment from "./ChildComment";
import {useEffect, useState} from "react";


export default function Comment({
                                    parentId, name, photo_link, comment, created_at, upVotes, replies,
                                    onNewCommentChild, comment_component_id, editComment, deleteParentComment,
                                    deleteChildComment
                                }) {
    const [showReplies, setShowReplies] = useState(false);
    const [inputChildComment, setInputChildComment] = useState(false);
    const [childComment, setChildComment] = useState("");
    useEffect(() => {

    }, [showReplies]);
    const hasReplies = showReplies && replies.length > 0;

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleAddChildComment = () => {
        setInputChildComment(!inputChildComment);
        setChildComment("");
    };

    const getChildComment = () => {
        setChildComment("");
        setInputChildComment(!inputChildComment)
        onNewCommentChild(childComment, parentId, comment_component_id, name, photo_link);
    }

    const handleInputChildCommentUpdate = (event) => {
        setChildComment(event.target.value);
    }

    const handleDeleteMessage = () => {
        deleteParentComment(comment_component_id, parentId);
    }

    const handleEditComment = () => {
        editComment(comment_component_id, parentId);
    }


    return (
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
                                        onClick={handleEditComment}> Edit
                                </button>
                            </div>
                            <div className="col-sm-auto">
                                <button
                                    className={"btn btn-outline-primary bi bi-arrow-return-left text-info"}
                                    onClick={handleAddChildComment}
                                >{" "}Reply
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-start mt-2">
                            <p>{comment}</p>
                        </div>
                        {inputChildComment &&
                            <div className={"row justify-content-end mt-2"}>
                                <div className={"col-sm-auto p-1"}>
                                    <img
                                        src={photo_link}
                                        className="rounded-circle"
                                        height="40"
                                        alt="Profile Picture of Current User"
                                        loading="lazy"
                                    />
                                </div>
                                <div className={"col-md-11 p-1"}>
                                    <input className={"form-control"} placeholder={"add a reply.."}
                                           value={childComment} onInput={handleInputChildCommentUpdate}/>
                                </div>
                                <div className={"row justify-content-end p-1"}>
                                    <div className={"col-sm-auto"}>
                                        <button className={"btn"} onClick={handleAddChildComment}>CANCEL</button>

                                    </div>
                                    <div className={"col-sm-auto"}>
                                        <button className={"btn"} onClick={getChildComment}>REPLY</button>
                                    </div>
                                </div>
                            </div>
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
                                    <ChildComment key={reply.comment_id} comment={reply.comment} comment_id={reply.comment_id}
                                                  parent_comment_id={comment_component_id} created_at={reply.created_at} photo_link={reply.photo}
                                                  name={reply.name} upVotes={upVotes} deleteChildComment={deleteChildComment}


                                    />
                                ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}