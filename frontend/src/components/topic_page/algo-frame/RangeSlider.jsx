import {useEffect, useState} from "react";
import styles from "./RangeSlider.module.css"
import cx from "classnames";

export default function RangeSlider() {
    
    const [speed, setSpeed] = useState(0);
    useEffect(() => {

    },[speed]);
    const handleSliderChange = (event) => {
        setSpeed(event.target.value);
        let steps = (speed - event.target.min) / (event.target.max - event.target.min) * 100;
        event.target.style.background = "linear-gradient(to right, #00B712 0%, #00B712 " + steps + '%, rgba(61, 66, 74, 0.1) ' + steps + "%, rgba(61, 66, 74, 0.1) 100%";
    }

    return (
        <>
            <label htmlFor="customRange3" className="form-label">Speed</label>
            <div className="range form-group">
                <input value={speed} onClick={handleSliderChange} onChange={handleSliderChange} type="range"
                       className={cx("form-group ",styles["custom-slider"])} min="1" max="100" step="1"
                       id="customRange3"/>
            </div>
        </>

    )

}