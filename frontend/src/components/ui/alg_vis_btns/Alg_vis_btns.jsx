import React, {useState} from 'react'
import styles from './alg_btns.module.css'
import {GrPlay} from 'react-icons/gr';
import {GrPrevious} from 'react-icons/gr';
import {GrNext} from 'react-icons/gr'
import cx from "classnames";

const Alg_vis_btns = () => {
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
                <div className={"row"}>
                    <div className={"col-sm-auto small align-self-center"}>
                        <button className={cx(styles['alg_vis_btn_play'], 'p-1')}><GrPlay/></button>
                    </div>
                    <div className={"col-sm-auto small  align-self-center"}>
                        <button className={cx(styles['alg_vis_btn_inData'], 'p-1')}>INPUT DATA</button>
                    </div>
                    <div className={"col-sm-auto small align-self-center"}>
                        <button className={cx(styles['alg_vis_btn_steps'], 'p-1')}>STEPS</button>
                    </div>
                    <div className={"col align-content-center me-xl-5"}>
                        <div className={"row justify-content-center"}>
                            <button className={styles['alg_vis_btn_steps_amount']}>x step of x</button>
                        </div>
                        <div className={"row justify-content-center"}>
                            <div className={"col-sm-auto mt-2"}>
                                <button className={styles['alg_vis_btn_prev']}><GrPrevious/></button>
                            </div>
                            <div className={"col-sm-auto mt-2"}>
                                <button className={styles['alg_vis_btn_next']}><GrNext/></button>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-auto small align-self-center"}>
                        {/* TODO when setting up the server a user can only either like or dislike; A like/dislike must be unique per user */}
                        <button className={cx(styles['alg_vis_btn_like'], "row bi bi-hand-thumbs-up p-1 p-lg-auto")}
                             onClick={handleLike}>
                            <div className={"col-sm-auto "} unselectabl e={"on"}>{likes}</div>
                        </button>
                    </div>
                    <div className={"col-sm-auto small align-self-center"}>
                        {/* TODO when setting up the server a user can only either like or dislike; A like/dislike must be unique per user */}
                        <button className={cx(styles['alg_vis_btn_dislike'], "row bi bi-hand-thumbs-down p-1 p-lg-auto")}
                             onClick={handleDislike}>
                            <div className={"col-sm-auto"} unselectable={"on"}>{dislikes}</div>
                        </button>
                    </div>
                    <div className={"col-sm-auto small align-self-center me-3 ps-5 "}>
                        <button className={cx(styles['alg_vis_btn_report'], "p-1 p-lg-auto")}>REPORT</button>
                    </div>
                </div>
            </div>
            {/* <Alg_vis_stps/> */}


        </div>
    )
}

export default Alg_vis_btns