import React from 'react'
import alg_vis_stps from './alg_vis_stps'
import './alg_btns.css'
const Alg_vis_btns = () => {
  return (
    <div className='alg_visualizer'>
        <button class='alg_vis__btn_play'>Play</button>
        <button class='alg_vis__btn_inData'>INPUT DATA</button>
        <button class='alg_vis__btn_steps'>STEPS</button>
        <button class='alg_vis__btn_prev'>Prev</button>
        <alg_vis_stps/>
        <button class='alg_vis__btn_next'>Next</button>
        <button class='alg_vis__btn_like'>up</button>
        <button class='alg_vis__btn_dislike'>down</button>
        <button class=''>report</button>

    </div>
  )
}

export default Alg_vis_btns