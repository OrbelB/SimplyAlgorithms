import "./ShowMoreHighlights.css";
import HighlightsPreview from "../HighlightsPreview/HighlightsPreview";
import { selected_topic2 } from "../HighlightsDB";

export default function ShowMoreHighlights(){

    return (
    <>
    {/* <!-- Button trigger modal --> */}

<div className="text-center m-2">
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#backdrop2">
        Show More
    </button>
</div>

{/* <!-- Modal --> */}
<div className="modal fade" id="backdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bt">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">Highlights</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
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
        </div>
        <div className="secondline row">
                <div className="col-8">
                    <div class="input-group">
                        <input type="search" id="form1" class="form-control" placeholder="Search"/>
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
    </div>
  </div>
</div>
    </>
  );
}
