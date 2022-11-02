import cx from "classnames";
import styles from "./InputComment.module.css"
import {useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function InputComment({
                                         onNewComment
                                     }) {
    const profilePicture = useSelector(state => state.user.profilePicture);
    const [text, setText] = useState("");
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const handleInputText = (event) => {
        setText(event?.target.value);
    }

    const handleSubmitForm = (event) => {
        event?.preventDefault();
        console.log(isLoggedIn)
        if(!isLoggedIn) {
            //show users to login 
            navigate("/login")
        }
        if (text.length === 0 || text === "") return
        onNewComment(text);
        setText("");
    }

    return (
        <div className={cx("container-fluid", styles["input-comment-style"])}>
            <form className={cx("grid p-3")} onSubmit={handleSubmitForm} >
                <div className="row justify-content-evenly">
                    <div className="col-auto col-sm-auto m-auto align-self-center">
                        <img
                            src={profilePicture}
                            className="rounded-circle"
                            height="50"
                            alt="profile"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-auto col-md-9 col-sm-auto m-auto align-self-center">
                        <input className="form-control  m-1 p-3 p-sm-auto" onInput={handleInputText} value={text}
                               placeholder={"add a comment..."}/>
                    </div>
                    <div className="col-auto col-sm-auto  align-self-center m-auto">
                        <button className={cx("btn btn-outline-primary text-white p-auto", styles["btn-style"])}
                                type={"submit"}>Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}