import Upvotes from "./Upvotes";

export default function Comment() {

    return (
        <div className={"container-fluid mt-3"}>
            <div className="grid">
                <div className="row">
                    <div className="col-sm-2">
                        <Upvotes/>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-1">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="40"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-sm-1">
                                <p className={"text-primary"}>name</p>
                            </div>
                            <div className="col-4">
                                <p className={"text-secondary"}>2 months ago</p>
                            </div>
                            <div className="col-sm-auto">
                                <i className={"bi bi-trash text-danger"}>{" "}Delete</i>
                            </div>
                            <div className="col-sm-auto ">
                                <i className={"bi bi-pencil-fill "}> Edit</i>
                            </div>
                            <div className="col-sm-auto">
                                <i className={"bi bi-arrow-return-left text-info"} >{" "}Reply</i>
                            </div>

                        </div>
                        <div className="row mt-2">
                            <p>Impressive! Though it seems the drag feature could be improved. But overall it looks
                                incredible. You’ve nailed the design and the responsiveness at various breakpoints works
                                really well.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}