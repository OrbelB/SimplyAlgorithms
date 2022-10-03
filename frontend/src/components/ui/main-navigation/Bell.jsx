import {useState} from "react";
import cx from "classnames";
import styles from "./Bell.module.css"
export default function Bell() {
    const [clickedBell, setClickedBell] = useState(false);
    const handleBellButtonClicked = (event) => {
        setClickedBell(!clickedBell);
    }
    return (
        <>
            {clickedBell ? <span onClick={handleBellButtonClicked} className={cx("bi bi-bell-fill", styles["custom-bell"])}></span> :
                <span onClick={handleBellButtonClicked} className={cx("bi bi-bell", styles["custom-bell"])}></span>}
        </>

    );

}