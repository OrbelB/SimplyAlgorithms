import TopicNames from "./TopicNames";
import cx from "classnames";
import "./Categories.css"

export default function TypeAlgorithms({type_topic, index}) {

    return (
        <>
            <div className="space"></div>
            <div className="input-space">
                <input id={`collapsible${index+1}`} className={cx("row", `toggle cat${index+1}`)} type="checkbox"/>
                <label htmlFor={`collapsible${index+1}`}
                       className={`lbl-toggle cat${index+1}`}>{type_topic?.type}</label>
                <div className="collapsible-content">
                    <div className="content-inner">
                        <TopicNames topic_link={type_topic?.topic_link} topic_names={type_topic?.topic_name} index={index}/>
                    </div>
                </div>
            </div>
            <div className="space"></div>
        </>
    );

}