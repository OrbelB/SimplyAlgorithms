import "./Categories.css"
export default function TopicNames({topic_names}) {

    return (
        <>
            {topic_names.map((topic_name, index) => (
                <>
                    <button className="topic">{topic_name}</button>
                    {index + 1 % 2 === 0 && <><br/><br/></>}
                </>
            ))}
        </>
    );
}