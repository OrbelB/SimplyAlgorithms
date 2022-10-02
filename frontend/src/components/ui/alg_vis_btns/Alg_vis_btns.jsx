import React from 'react'
import Alg_vis_stps from './Alg_vis_stps'
import './alg_btns.css'
import {GrPlay} from 'react-icons/gr';
import {GrPrevious} from 'react-icons/gr';
const Alg_vis_btns = () => {
  return (
    <div className='alg_visualizer'>
         {/* <Alg_vis_stps/> */}
        <button class='alg_vis_btn_play'><GrPlay/></button>
        <button class='alg_vis_btn_inData'>INPUT DATA</button>
        {/* <button class='alg_vis_btn_steps'>STEPS</button> */}
        <button class='alg_vis_btn_prev'><GrPrevious/></button>
        <button class='alg_vis_btn_next'></button>
        <button class='alg_vis_btn_like'></button>
        <button class='alg_vis_btn_dislike'></button>
        <button class='alg_vis_btn_report'></button>

    </div>
  )
}

export default Alg_vis_btns