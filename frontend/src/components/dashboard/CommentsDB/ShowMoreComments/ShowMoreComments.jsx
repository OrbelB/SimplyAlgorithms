import CommentsPreview from '../CommentsPreview/CommentsPreview';
import { SELECTED_TOPICS } from '../CommentsDB';
import './ShowMoreComments.css';

export default function ShowMoreComments() {
  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <div className="text-center m-2">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#backdrop1"
        >
          Show More
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="backdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Comments
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
                {SELECTED_TOPICS.map(({ index, topic }) => {
                  return (
                    <div key={index}>
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
                  <div className="input-group">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button type="button" className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="col-1">
                  <div className="sortby">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <button className="dropdown-item" type="button">
                          Sort by Item 1
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Sort by Item 2
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Sort by Item 3
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="thirdline">
                <CommentsPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
