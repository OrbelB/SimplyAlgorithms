import styles from "./Frame.module.css"
import cx from 'classnames';
import { Grid  } from 'react-loading-icons'
//import ToggleVisibility from "../../../ToggleVisibility";
//https://reactjs.org/docs/dom-elements.html



export default function AlgoFrame({vis_url, viz_title}) {

  function disableLoader(){
    console.log(" Item loaded")
  }
    return (
      <div className={cx(styles["container-style"])}>
        <div className={cx(styles["temp_view"])}>
          <Grid />
        </div>
        <div className={cx(styles["algo_title"])} >
          {viz_title}
        </div>
        <iframe id="viz_alg" src={vis_url}
          className={cx(styles["website"])} loading="lazy" scrolling="no" 
          title="bubble sort algorithm visualizer by algorithm-visualizer.org"
          onLoad={disableLoader}>
          <p>Your browser does not support iframes :( </p>
        </iframe>
        <div className={cx(styles["credit"])}>
          Algorithm visualizer brought to you by 
          <a className={cx(styles["credit_link"])} href="https://algorithm-visualizer.org/" target="_blank" rel="noreferrer"> algorithm-visualizer.org</a>
        </div>
      </div>
    );
}