import "./Categories.css"
import TypeAlgorithms from "./TypeAlgorithms";

export default function Categories({types_topics}) {
    return (
        <div className="wrap-collabsible">
            {
                types_topics.map((type_topic, index) => (
                    <TypeAlgorithms key={index} type_topic={type_topic} index={index}/>
                ))
            }
            <div className="bottom"></div>
        </div>
    )
}

