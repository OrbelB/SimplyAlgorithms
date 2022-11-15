import React from "react";
import { useParams } from "react-router-dom";
import cx from "classnames";
import fp from "./ForumPost.module.css";
// import { BiLike, BiDislike } from 'react-icons/bi';
// import {useState} from "react";
import CommentFrame from "../../comment/CommentFrame";
import Related_RecentPosts from "../forum_home/Related_RecentPosts";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleForum } from "../../../services/forum";
import { beautifyTime } from "../../../utilities/beautify-time";
import Vote from "../../vote_comp/Vote";
import ForumOptionMenu from "./ForumOptionMenu";
let forum_post = {
  user: "Mack",
  title: "sectetur adipisicing elit. Error, culpa tempora, obca?",
  text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!",
  like: 55201,
  dislike: 500,
  posted: "2 months ago",
  tags: "#temp, #temp2, #temp3",
  photo: "add later",
  video: "add later",
  user_voted: false,
  LD_ratio: function () {
    return ((this.like - this.dislike) / (this.like + this.dislike)) * 100;
  },
};

export default function ForumPost() {
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const { status, error, forum } = useSelector((state) => state.forum);
  if (status === "idle" || status === "successToIdle") {
    dispatch(fetchSingleForum(pageId));
  }

  if (status === "success") {
    return (
      <div key={pageId} className={cx(fp["window"], "container-fluid")}>
        <div className={cx()}>
          <div className={cx(fp["side2"])}>
            <h1 className={cx(fp["category-label"])}>Related Posts</h1>
            <div className={cx(fp["related-posts"])}></div>
          </div>
          <div
            className={cx(
              fp["post"],
              "border border-success p-2 rounded-bottom rounded-4 border-info bg-secondary text-dark bg-opacity-50 h-auto d-inline-block "
            )}
          >
            <div className={cx(fp["user"])}>
              <div className="row">
                <div className="col">{forum?.userDto?.username}</div>
                {forum?.tags.map((tag) => (
                  <div className="col" key={tag.tagId}>
                    {tag.tag}
                  </div>
                ))}
                <div className="col">
                  {beautifyTime({ createdDate: forum?.createdDate })}
                </div>
                <div className="col d-flex justify-content-end">
                  <ForumOptionMenu userId={forum?.userDto?.userId} pageId={forum?.pageId} />
                </div>
              </div>
            </div>
            <h3 className={cx(fp["title"])}>{forum?.title}</h3>
            <div
              className={cx(fp["quetion"], "overflow-auto fw-normal lh-base")}
            >
              {forum?.descriptionText}
            </div>
            <Vote
              like_={forum?.upVotes}
              dislike_={forum?.downVotes}
              user_voted_={true}
            />
          </div>
        </div>
        <div>
          <CommentFrame passedComments={forum?.comments} page={forum?.pageId} />
        </div>
      </div>
    );
  }
}

//{/* bootstrap border-{thikness number 1 - 5} border-{top bottom right left or if its a box just put border}  */}
