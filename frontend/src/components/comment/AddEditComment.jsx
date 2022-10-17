import {useState} from "react";

export default function AddEditComment({
                                           photo_link, comment, handleAddEditComment, cancelReplyElement

                                       }) {
    const [checkComment, setCheckComment] = useState(comment || "");

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
                    src={photo_link}
                    className="rounded-circle"
                    height="38"
                    alt="Profile Picture of Current User"
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