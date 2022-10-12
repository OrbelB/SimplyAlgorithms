import cx from "classnames";
import styles from "./Upvotes.module.css"
import {useState} from "react";

export default function Upvotes({
                                    upVotes

                                }) {

    const [votes, setVotes] = useState(upVotes);
    const handleUpvotes = () => {
        setVotes(votes + 1);
    }

    const handleDownvotes = () => {
        setVotes(votes <= 1 ? 0 : votes - 1);
    }

    return (
        <div className={cx("container-fluid square", styles["container-style"])}>
            <div className="grid">
                <div className="row row-cols-sm-auto justify-content-center align-self-start text-center p-2">
                    <i className={cx("bi bi-plus", styles["btn-sign-style"])} onClick={handleUpvotes}></i>
                </div>
                <div className="row row-cols-sm-auto justify-content-center align-self-center text-center p-2">
                    <p className={styles["num-style"]}>{votes}</p>
                </div>
                <div className="row row-cols-sm-auto justify-content-center align-self-end text-center p-2">
                    <i className={cx("bi bi-dash", styles["btn-sign-style"])} onClick={handleDownvotes}></i>
                </div>
            </div>
        </div>
    );

}