import HighlightsPreview from "./HighlightsPreview/HighlightsPreview";


const selected_topic2 = [
    {
        topic: "Splay Tree"
    }
]

export {selected_topic2}
export default function HighlightsDB(){
    return(
        <div>
            {selected_topic2.map(({topic}) => {
                return(
                <div>
                    <div className="firstline">
                        <div className="topic-selected">
                            <h5>Topic: {topic}</h5>
                        </div>
                    </div>
                </div>
                );
            })}
            <div className="secondline row">
                <div className="col-8">
                    <div className="input-group">
                        <input type="search" id="form1" className="form-control" placeholder="Search"/>
                        <button type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="col-1">
                    <div className="sortby">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" type="button">Sort by Item 1</button></li>
                            <li><button className="dropdown-item" type="button">Sort by Item 2</button></li>
                            <li><button className="dropdown-item" type="button">Sort by Item 3</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="thirdline">
                <HighlightsPreview/>
            </div>
        </div>
    );
}