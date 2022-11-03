import React from 'react'
import cx from "classnames";
import { BiLike, BiDislike } from 'react-icons/bi';
import fp from './vote.module.css'
import { useParams } from 'react-router-dom';
import {useState} from "react";

// let forum_post = {
//     user:   "Mack",
//     title:  "sectetur adipisicing elit. Error, culpa tempora, obca?",
//     text:   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!",
//     like:   500,
//     dislike:5000,
//     posted: "2 months ago",
//     tags:   "#temp, #temp2, #temp3",
//     photo:  "add later",
//     video:  "add later",
//     user_voted: false,
  
//     LD_ratio: function() {
//         return ((this.like-this.dislike) / (this.like+this.dislike)) * 100;
//     }
//   };

export default function Vote({like_, dislike_, user_voted_}) {
    // const { id } = useParams(); 
    const [like,setlike] = useState(like_)
    const [dislike,setdislike] = useState(dislike_)

    const [likeActive, setLikeActive] = useState(user_voted_)
    const [dislikeActive, setdisLikeActive] = useState(user_voted_)

    
    const like_forum = () =>{
      if(likeActive){
        setLikeActive(false)
        setlike(like -1)
      }
      else{
        setLikeActive(true)
        setlike(like+1)
        if(dislikeActive){
          setdisLikeActive(false)
          setlike(like+1)
          setdislike(dislike-1)
        }
      }
    }
    
    const dislike_forum = () =>{
      if(dislikeActive){
        setdisLikeActive(false)
        setdislike(dislike -1)
      }
      else{
        setdisLikeActive(true)
        setdislike(dislike+1)
        if(likeActive){
          setLikeActive(false)
          setlike(dislike+1)
          setlike(like-1)
        }
      }
    }
    return (
    <div className={cx(fp["vote"], "border rounded-pill bg-info bg-opacity-50")}>
        <button onClick={like_forum} className={cx(fp["ld"])}> <BiLike/></button>{like}
        <button onClick={dislike_forum} className={cx(fp["ld"])}> <BiDislike/></button>{dislike}
    </div>
  )
}