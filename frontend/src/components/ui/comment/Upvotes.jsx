import cx from "classnames";
import styles from "./Upvotes.module.css"
import {useState} from "react";

export default function Upvotes({
    upVotes

                                }) {

    const [votes, setVotes] = useState(upVotes);
    const handleUpvotes = () => {
        setVotes(votes +1);
    }

    const handleDownvotes = () => {
        setVotes(votes <= 1 ? 0 : votes- 1 );
    }

    return(
        <div className={cx("container-fluid square", styles["container-style"])}>
            <div className="grid">
                <div className="row align-self-center text-center p-2">
                    <i className={cx("bi bi-plus", styles["btn-sign-style"])} onClick={handleUpvotes}></i>
                </div>
                <div className="row align-self-center text-center p-2">
                    <p className={styles["num-style"]}>{votes}</p>
                </div>
                <div className="row text-center align-self-end p-2">
                    <i className={styles["btn-sign-Style"]}  onClick={handleDownvotes}>-</i>
                </div>
            </div>
        </div>

    );

}