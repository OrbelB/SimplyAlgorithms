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
                    <div className="col col-sm-auto m-auto align-self-center">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            className="rounded-circle"
                            height="50"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-9 col-md-9 col-sm-auto align-self-center">
                        <input className="form-control  m-auto p-3 p-sm-auto" onInput={handleInputText} value={text}
                               placeholder={"add a comment..."}/>
                    </div>
                    <div className="col col-sm-auto  align-self-center m-auto">
                        <button className={cx("btn btn-outline-primary text-white p-auto", styles["btn-style"])}
                                onClick={handleSendButton}>Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )

}