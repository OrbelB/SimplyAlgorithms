import React, {useState} from 'react'
import styles from './AlgBtns.module.css'
import {GrPlay} from 'react-icons/gr';
import {GrPrevious} from 'react-icons/gr';
import {GrNext} from 'react-icons/gr'
import cx from "classnames";

const AlgVisBtns = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const handleLike = () => {
        setLikes(likes + 1);
    }
    const handleDislike = () => {
        setDislikes(dislikes + 1);
    }

    return (

        <div className={cx(styles['alg_visualizer'], 'container-fluid')}>
            <div className={"grid p-2"}>
                <div className={"row justify-content-evenly p-0"}>
                    <div className={"col-auto col-sm-auto small align-self-center m-0 p-2 p-sm-1"}>
                        <button className={cx(styles['alg_vis_btn_play'], 'rounded-4 ps-2 pe-2 small')}><GrPlay/></button>
                    </div>
                    <div className={"col-auto col-sm-auto small align-self-center p-0"}>
                        <button className={cx(styles['alg_vis_btn_inData'], 'rounded-4 small')}>INPUT DATA</button>
                    </div>
                    <div className={"col-auto col-xs-auto  col-sm-auto small align-self-center p-2"}>
                        <button className={cx(styles['alg_vis_btn_steps'], 'p-1 pe-3 ps-3 small')}>STEPS</button>
                    </div>
                    <div className={"col align-self-center"}>
                        <div className={"row justify-content-center"}>
                            <button className={cx(styles['alg_vis_btn_steps_amount'], 'w-auto')}>x step of x
                            </button>
                        </div>
                        <div className={"row justify-content-evenly"}>
                            <div className={"col-auto col-xs-auto  col-sm-auto align-self-center mt-2"}>
                                <button className={cx(styles['alg_vis_btn_prev'], 'm-auto')}><GrPrevious/></button>
                                <button className={cx(styles['alg_vis_btn_next'], 'm-auto')}><GrNext/></button>
                            </div>
                        </div>
                    </div>
                    <div className={"col-auto col-xs-auto  col-sm-auto small align-self-center"}>
                        {/* TODO when setting up the server a user can only either like or dislike; A like/dislike must be unique per user */}
                        <button
                            className={cx(styles['alg_vis_btn_like'], "row bi bi-hand-thumbs-up p-1 p-lg-auto ")}
                            onClick={handleLike}>
                            <div className={"col-sm-auto small"} unselectable={"on"}>{likes}</div>
                        </button>
                    </div>
                    <div className={"col-auto col-xs-auto  col-sm-auto small align-self-center"}>
                        {/* TODO when setting up the server a user can only either like or dislike; A like/dislike must be unique per user */}
                        <button
                            className={cx(styles['alg_vis_btn_dislike'], "row bi bi-hand-thumbs-down p-1 p-lg-auto ")}
                            onClick={handleDislike}>
                            <div role="button" className={"col-sm-auto small"} unselectable={"on"}>{dislikes}</div>
                        </button>
                    </div>
                    <div className={"col-auto  col-xs-auto  col-sm-auto small align-self-center me-3 ps-0"}>
                        <button className={cx(styles['alg_vis_btn_report'], "p-1 small ")}>REPORT</button>
                    </div>
                </div>
            </div>
            {/* <Alg_vis_stps/> */}
        </div>

    )
}

export default AlgVisBtns