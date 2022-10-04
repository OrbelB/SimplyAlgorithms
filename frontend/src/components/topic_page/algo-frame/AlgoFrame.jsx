import RangeSlider from "./RangeSlider";
import styles from "./Frame.module.css"
import cx from 'classnames';

export default function AlgoFrame() {
    return (
        <div className={cx(styles["container-style"], "container-fluid")}>
            <div className="row">
                <div className="col-10 mt-2">
                    <h1 className="ms-auto text-start">
                        Algorithm Title
                    </h1>
                </div>
                <div className="col mt-2">
                    <RangeSlider/>
                </div>
            </div>
            <div className="row">
                <div className="bg-transparent">
                    {/*TODO create algo component and logic*/}
                    <center> algo goes here</center>
                </div>
            </div>

        </div>
    );
}