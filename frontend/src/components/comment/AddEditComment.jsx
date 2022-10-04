import {useState} from "react";

export default function AddEditComment( {
    photo_link, comment,  handleAddEditComment, cancelReplyElement

                                        }) {
    const [checkComment, setCheckComment] = useState(comment || "");

    const handleInputChildCommentUpdate = (e) => {
        setCheckComment(e.target.value);
    };
    const handleAddChildComment = () => {
        cancelReplyElement();
    };

    const getChildComment = () => {
        handleAddEditComment(checkComment);
    };
    return(
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
                       value={checkComment} onInput={handleInputChildCommentUpdate}/>
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
    );


}