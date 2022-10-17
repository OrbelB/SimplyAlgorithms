import Upvotes from "./Upvotes";
import {useState} from "react";
import AddEditComment from "./AddEditComment";
import OptionMenu from "./OptionsMenu";
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
    };

    const onEditComment = (newEditedComment) => {
        editChildComment(newEditedComment, comment_id, user_id);
        setIsEditButtonClicked(!isEditButtonClicked);
    };

    return (
        <div className={"container-fluid p-3"}>
            <div className="grid">
                <div className="row">
                    <div className="col-auto col-sm-2 col-lg-2 p-2 p-sm-0">
                        <Upvotes upVotes={upVotes}/>
                    </div>
                    <div className="col-auto col-sm-10 col-lg-10 col-md-9">
                        <div className="row">
                            <div className="col-auto col-sm-1 m-1 m-sm-1 m-lg-0">
                                <img
                                    src={photo_link}
                                    className="rounded-circle"
                                    height="40"
                                    alt="profile user"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-auto col-sm-1 m-1 m-sm-1 m-lg-0 ">
                                <p className={"text-primary"}>{name}</p>
                            </div>
                            <div className="col-auto m-1 m-sm-1 m-lg-0">
                                <p className={"text-secondary"}>{created_at}</p>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className={"col-auto col-sm-10 col-lg-10 col-md-10"}>
                                {isEditButtonClicked ?
                                    <AddEditComment comment={comment} comment_id={comment_id} handleAddEditComment={onEditComment}
                                                    cancelReplyElement={handleIsEditButtonClicked}
                                                    photo_link={photo_link}/> :
                                    <p className={"text-break"}>{comment}</p>}
                            </div>
                            <div className={"col-auto align-items-center p-3 p-lg-0 p-md-0"}>
                                <OptionMenu handleDeleteMessage={onDeleteComment} passedCommentID={comment_id}
                                            handleIsEditCommentOpen={handleIsEditButtonClicked} canReply={false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}