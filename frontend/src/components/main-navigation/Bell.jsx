import {useState} from "react";
import cx from "classnames";
import styles from "./Bell.module.css";
import image from "../../assets/under-construction.jpg";
export default function Bell() {
    const [clickedBell, setClickedBell] = useState(false);
    const handleBellButtonClicked = () => {
        setClickedBell(!clickedBell);
    }
    return (
        <>
            {clickedBell ? <span onClick={handleBellButtonClicked} data-bs-toggle="modal" data-bs-target="#featureunderconstruction" className={cx("bi bi-bell-fill", styles["custom-bell"])}></span> :
                <span onClick={handleBellButtonClicked} data-bs-toggle="modal" data-bs-target="#featureunderconstruction" className={cx("bi bi-bell", styles["custom-bell"])}></span>}


<div className="modal fade" id="featureunderconstruction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className={"text-center"}>
            <div className="font text-align-center">
                <h2>This Feature is under Construction!</h2>
            </div>
                <img 
                    src={image}
                    height="100%"
                    width="100%"
                    className="rounded-circle text-align-center"
                    >
                </img>
            <div className="font text-center">
                <h2>Come back at a later time.</h2>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </>

    );

}