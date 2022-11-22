import RangeSlider from "./RangeSlider";
import styles from "./Frame.module.css"
import cx from 'classnames';
import Settings from "../bubble_sort_viz/Settings";
import React, { useState, useRef, useLayoutEffect } from "react";
import { BubbleSort } from "../bubble_sort_viz/Bubblesort";
import { randomizeArray } from "../bubble_sort_viz/RandomizeArray";
import SortAnimations from "../bubble_sort_viz/sortingAnimation";


export default function AlgoFrame() {

    //to store the bar divs
    const ARRAY_BARS = useRef(Settings.ARRAY_BARS);
    //to store the current array
    const [populatedArray, setPopulatedArray] = useState([]);
    //flag to show when shuffling is done
    const [isRandomizedArrayClicked, setIsRandomizedArrayClicked] =
    useState(false);
    //flag to show when sorting is done
    const [isSorted, setIsSorted] = useState(false);


    useLayoutEffect(() => {
        if (isRandomizedArrayClicked) {
          const shuffleArray = randomizeArray(populatedArray, ARRAY_BARS);
          setPopulatedArray((prevstate) => (prevstate = shuffleArray));
          setIsRandomizedArrayClicked(false);
        }
        if (isSorted) {
          Settings.SLIDER[0].disabled = false;
          Settings.BUTTONS[0].disabled = false;
          Settings.BUTTONS[1].disabled = false;
          setIsSorted(false);
        }
    
      }, [isRandomizedArrayClicked, isSorted, populatedArray]);
    
      const savePopulatedArrayHandler = (array) => {
        setPopulatedArray(array);
      };
    
      const randomizeArrayHandler = (event) => {
        if (!isRandomizedArrayClicked) {
          setIsRandomizedArrayClicked(true);
        }
      };

      const performBubbleSortHandler = (event) => {
        const animations = BubbleSort(populatedArray);
        SortAnimations.animateBubbleSort(animations, setIsSorted, ARRAY_BARS, populatedArray);
      };
    




    return (
        <div className={cx(styles["container-style"], "container-fluid")}>
            <div className="row justify-content-between">
                <div className="col col-sm-auto mt-3">
                    <h1 className="ms-auto m-0 p-3 text-start">
                        Algorithm Title
                    </h1>
                </div>
                <div className="col col-sm-auto mt-3">
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