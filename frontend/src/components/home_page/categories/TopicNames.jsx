import "./Categories.css"
import { NavLink } from "react-router-dom";
export default function TopicNames({topic_names, topic_link}) {

    return (
        <> 
        {/* change it to a navlink */}
            {topic_names.map((topic_name, index) => (
                <>
                    <NavLink className="topic" exact to={topic_link[index]}>{topic_name}</NavLink>
                    {index + 1 % 2 === 0 && <></>}
                </>
            ))}
        </>
    );
}