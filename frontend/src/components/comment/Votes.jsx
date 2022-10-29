import cx from "classnames";
import styles from "./Upvotes.module.css"
import {useState} from "react";

export default function Votes({
                                    passedVotes

                                }) {

    const [votes, setVotes] = useState(passedVotes);
    const handleUpVotes = () => {
        setVotes(votes + 1);
    }

    const handleDownVotes = () => {
        setVotes(votes - 1);
    }

    return (
        <div className={cx("container-fluid square", styles["container-style"])}>
            <div className="grid">
                <div className="row row-cols-sm-auto justify-content-center align-self-start text-center p-2">
                    <i className={cx("bi bi-plus", styles["btn-sign-style"])} onClick={handleUpVotes}></i>
                </div>
                <div className="row row-cols-sm-auto justify-content-center align-self-center text-center p-2">
                    <p className={styles["num-style"]}>{votes}</p>
                </div>
                <div className="row row-cols-sm-auto justify-content-center align-self-end text-center p-2">
                    <i className={cx("bi bi-dash", styles["btn-sign-style"])} onClick={handleDownVotes}></i>
                </div>
            </div>
        </div>
    );

}