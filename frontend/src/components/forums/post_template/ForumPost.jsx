import React from 'react'
import { useParams } from 'react-router-dom';
import cx from "classnames";
import fp from "./ForumPost.module.css";

export default function ForumPost ()  {
    const { id } = useParams(); 
   // let name = forum_post.name
    console.log("Hello")
  return (
    <div key={id} className={cx(fp["e"], "contaainer-fluid")}>
      Hello Dave

    </div>
    
  )
}


//{/* bootstrap border-{thikness number 1 - 5} border-{top bottom right left or if its a box just put border}  */}