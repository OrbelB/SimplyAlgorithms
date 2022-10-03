import cx from "classnames";
import styles from "./InputComment.module.css"
export default function InputComment() {

    return(
        <div className={cx("container-fluid", styles["input-comment-style"])}>
            <div className={cx("grid p-3")}>
                <div className="row">
                    <div className="col-sm-1 align-self-center">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            className="rounded-circle"
                            height="50"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-9 align-self-center">
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="col-sm-2  align-self-center">
                        <button className={cx("btn btn-outline-primary text-white ps-4 pe-4 pt-1", styles["btn-style"])}>Send</button>
                    </div>
                </div>
            </div>
        </div>

    )

}