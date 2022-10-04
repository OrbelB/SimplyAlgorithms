import Upvotes from "./Upvotes";
import {useState} from "react";
import AddEditComment from "./AddEditComment";
//TODO make users capable to change their comments only
export default function ChildComment({
                                         photo_link,
                                         name,
                                         created_at,
                                         upVotes,
                                         comment,
                                         deleteChildComment,
                                         comment_id,
                                         parent_comment_id,
                                         editChildComment, user_id

                                     }) {

    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

    const handleIsEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked);
    };
    const onDeleteComment = () => {
        deleteChildComment(parent_comment_id, comment_id);
    }

    const onEditComment = (newEditedComment) => {
        setIsEditButtonClicked(!isEditButtonClicked)
        editChildComment(newEditedComment, comment_id, user_id)
    }


    return (
        <div className={"container-fluid p-3"}>
            <div className="grid">
                <div className="row">
                    <div className="col-sm-2">
                        <Upvotes upVotes={upVotes}/>
                    </div>
                    <div className="col me-lg-5">
                        <div className="row">
                            <div className="col-sm-1">
                                <img
                                    src={photo_link}
                                    className="rounded-circle"
                                    height="40"
                                    alt="profile picture"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-sm-1">
                                <p className={"text-primary"}>{name}</p>
                            </div>
                            <div className="col me-lg-auto">
                                <p className={"text-secondary"}>{created_at}</p>
                            </div>
                            <div className="col-sm-auto">
                                <button className={"btn btn-outline-primary bi bi-trash text-danger"}
                                        onClick={onDeleteComment}>{" "}Delete
                                </button>
                            </div>
                            <div className="col-sm-auto ">
                                <button className={"btn btn-outline-primary bi bi-pencil-fill "} onClick={handleIsEditButtonClicked}> Edit</button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            {isEditButtonClicked ?
                                <AddEditComment comment={comment} handleAddEditComment={onEditComment}
                                                cancelReplyElement={handleIsEditButtonClicked} photo_link={photo_link}/> :
                                <p>{comment}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}