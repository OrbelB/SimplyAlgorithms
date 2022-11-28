import "./Categories.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forumActions } from "../../../store/reducers/forum-reducer";
import { nanoid } from "@reduxjs/toolkit";
export default function TopicNames({topic_names, topic_link}) {
    const dispatch = useDispatch();

    return (
        <> 
        {/* change it to a navlink */}
            {topic_names.map((topic_name, index) => (
                <>
                    <NavLink key={nanoid()} className="topic"  to={topic_link[index]} onClick={(state) => {dispatch(forumActions.resetData());}}>{topic_name}</NavLink>
                    {index + 1 % 2 === 0 && <></>}
                </>
            ))}
        </>
    );
}