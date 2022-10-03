import cx from "classnames";
import styles from "./Upvotes.module.css"

export default function Upvotes() {
    return(
        <div className={cx("container-fluid square", styles["container-style"])}>
            <div className="grid">
                <div className="row align-self-center text-center">
                    <i className={cx("bi bi-plus", styles["btn-sign-style"])}></i>
                </div>
                <div className="row align-self-center text-center">
                    <p className={styles["num-style"]}>10</p>
                </div>
                <div className="row align-self-center text-center">
                    <i className={styles["btn-sign-Style"]}>-</i>
                </div>
            </div>
        </div>

    );

}