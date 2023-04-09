import './ShowMoreNotes.css';
import { Button } from '@mui/material';
import NotesPreview from '../NotesPreview/NotesPreview';

export default function ShowMoreNotes() {
  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <div className="text-center m-2">
        <Button
          type="button"
          variant="contained"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#backdrop2"
        >
          Show More
        </Button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="backdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bt">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Notes
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="secondline row">
                <div className="col-5">
                  <div className="input-group">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Search..."
                    />
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
                          Newest
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Alphabetically
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="thirdline">
                <NotesPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
