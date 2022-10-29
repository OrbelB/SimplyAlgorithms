import React from 'react'
import { useParams } from 'react-router-dom';
import cx from "classnames";
import fp from "./ForumPost.module.css";
import { BiLike, BiDislike } from 'react-icons/bi';
import {useState} from "react";
let forum_post = {
  user:   "Mack",
  title:  "sectetur adipisicing elit. Error, culpa tempora, obca?",
  text:   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!",
  like:   50,
  dislike:10,
  posted: "2 months ago",
  tags:   "#temp, #temp2, #temp3",
  photo:  "add later",
  video:  "add later",
  user_voted: false,

  LD_ratio: function() {
      return ((this.like-this.dislike) / (this.like+this.dislike)) * 100;
  }
};

export default function ForumPost ()  {
    const { id } = useParams(); 
    const [like,setlike] = useState(forum_post.like)
    const [dislike,setdislike] = useState(forum_post.dislike)

    const [likeActive, setLikeActive] = useState(forum_post.user_voted)
    const [dislikeActive, setdisLikeActive] = useState(forum_post.user_voted)

    
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
    <div key={id} className={cx(fp["window"], "contaainer-fluid")}>
      <div className={cx(fp["post"], "border border-success p-2 rounded-bottom rounded-4 border-info bg-secondary text-dark bg-opacity-50 w-75 h-auto d-inline-block ")}> 
        <div className={cx(fp['user'])}>
          <h4 >
            {
              forum_post.user + " ~ " + forum_post.tags + " " + forum_post.posted
            }
          </h4>
        </div>
        <h3 className={cx(fp['title'])}>{forum_post.title}</h3>
        <div className={cx(fp['quetion'], "overflow-auto fw-normal lh-base")}>{forum_post.text}</div>
        <div className={cx(fp["vote"])}>
          <button onClick={like_forum} className={cx(fp["ld"])}> <BiLike/></button>{like}
          <button onClick={dislike_forum} className={cx(fp["ld"])}> <BiDislike/></button>{dislike}
          
          reply btn
          report btn
          </div>
      </div>
      <div>
        comment section
        
      </div>
    </div>
    
  )
}


//{/* bootstrap border-{thikness number 1 - 5} border-{top bottom right left or if its a box just put border}  */}