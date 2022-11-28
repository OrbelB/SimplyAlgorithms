import { nanoid } from "@reduxjs/toolkit";
import "./Categories.css"
import TypeAlgorithms from "./TypeAlgorithms";

export default function Categories({types_topics}) {
    return (
        <div className="wrap-collabsible">
            <h2 className="head text-center">Categories</h2>
            {
                types_topics.map((type_topic, index) => (
                    <TypeAlgorithms key={nanoid()} type_topic={type_topic} index={index}/>
                ))
            }
            <div className="bottom"></div>
        </div>
    )
}

