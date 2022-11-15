import {useState} from "react";
import { useSelector } from "react-redux";

export default function AddEditComment({
                                            commentText, handleAddEditComment, cancelReplyElement

                                       }) {
    const profilePicture = useSelector(state => state.user.profilePicture);                                   
    const [checkComment, setCheckComment] = useState(commentText || "");
    
    const handleInputChildCommentUpdate = (e) => {
        setCheckComment(e.target.value);
    };
    const handleCancelChildComment = () => {
        cancelReplyElement();
    };

    const getChildComment = (e) => {
        e.preventDefault();
        handleAddEditComment(checkComment);
    };

    return (
        <form onSubmit={getChildComment} className={"row justify-content-evenly mt-2"}>
            <div className={"col-auto col-sm-auto"}>
                <img
                    src={profilePicture}
                    className="rounded-circle"
                    height="38"
                    alt="Profile of Current User"
                    loading="lazy"
                />
            </div>
            <div className={"col-auto col-md-10 m-0 p-0"}>
                <input className={"form-control"} placeholder={"add a reply.."}
                       value={checkComment} onInput={handleInputChildCommentUpdate} type={"text"} />
            </div>
            <div className={"row justify-content-end pt-1"}>
                <div className={"col-auto col-sm-auto"}>
                    <button className={"btn"} onClick={handleCancelChildComment} type={"button"}>CANCEL</button>
                </div>
                <div className={"col-auto col-sm-auto"}>
                    <button className={"btn"}>REPLY</button>
                </div>
            </div>
        </form>

    );


}