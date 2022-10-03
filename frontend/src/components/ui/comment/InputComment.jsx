import cx from "classnames";
import styles from "./InputComment.module.css"
import {useState} from "react";

export default function InputComment({
                                         onNewComment
                                     }) {
    const [text, setText] = useState("");

    const handleInputText = (event) => {
        setText(event?.target.value);
    }

    const handleSendButton = () => {
        if (text.length === 0 || text === "") return
        onNewComment(text);
        setText("");
    }
    return (
        <div className={cx("container-fluid", styles["input-comment-style"])}>
            <div className={cx("grid p-3")}>
                <div className="row">
                    <div className="col-sm-auto align-self-center">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            className="rounded-circle"
                            height="50"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-md-10 align-self-center">
                        <input className="form-control p-4" onInput={handleInputText} value={text}
                               placeholder={"add a comment..."}/>
                    </div>
                    <div className="col-sm-auto  align-self-center">
                        <button className={cx("btn btn-outline-primary text-white ps-4 pe-4 pt-1", styles["btn-style"])}
                                onClick={handleSendButton}>Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )

}