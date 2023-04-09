import NotesPreview from './NotesPreview/NotesPreview';

export default function NotesDB() {
  return (
    <div>
      <div className="secondline-comments row p-2">
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
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
      <div className="thirdline-comments">
        <NotesPreview />
      </div>
    </div>
  );
}
