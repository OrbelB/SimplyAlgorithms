import Upvotes from "./Upvotes";

export default function childComment({
                                         photo_link, name, created_at, upVotes, comment,deleteChildComment, comment_id,parent_comment_id

                                     }) {
    const onDeleteComment = () => {
        deleteChildComment(parent_comment_id,comment_id);

    }
    return (
        <div className={"container-fluid p-3"}>
            <div className="grid">
                <div className="row">
                    <div className="col-sm-2">
                        <Upvotes upVotes={upVotes}/>
                    </div>
                    <div className="col me-lg-5">
                        <div className="row">
                            <div className="col-sm-1">
                                <img
                                    src={photo_link}
                                    className="rounded-circle"
                                    height="40"
                                    alt="profile picture"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-sm-1">
                                <p className={"text-primary"}>{name}</p>
                            </div>
                            <div className="col me-lg-auto">
                                <p className={"text-secondary"}>{created_at}</p>
                            </div>
                            <div className="col-sm-auto">
                                <button className={"btn btn-outline-primary bi bi-trash text-danger"} onClick={onDeleteComment}>{" "}Delete
                                </button>
                            </div>
                            <div className="col-sm-auto ">
                                <button className={"btn btn-outline-primary bi bi-pencil-fill "}> Edit</button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <p>{comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}