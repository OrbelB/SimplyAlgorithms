import { NavLink } from 'react-router-dom';

export default function WDataStructures() {
  return (
    <div className="wikibody">
      <div className="wikititle">DATA STRUCTURES</div>
      <div className="wiki-section">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Arrays
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Linked Lists
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Stack
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Queue
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none" />
              <div className="card-body tab-content">
                <div className="tab-pane active" id="profile">
                  <h3>What are Data Structures?</h3>
                  <h5>
                    In computer science, a data structure is a data
                    organization, management, and storage format that is usually
                    chosen for efficient access to data. More precisely, a data
                    structure is a collection of data values, the relationships
                    among them, and the functions or operations that can be
                    applied to the data, i.e., it is an algebraic structure
                    about data.
                    <br />
                    <br />
                    Data structures are generally based on the ability of a
                    computer to fetch and store data at any place in its memory,
                    specified by a pointer—a bit string, representing a memory
                    address, that can be itself stored in memory and manipulated
                    by the program. Thus, the array and record data structures
                    are based on computing the addresses of data items with
                    arithmetic operations, while the linked data structures are
                    based on storing addresses of data items within the
                    structure itself.
                  </h5>
                  <br />
                  <h3>How Do They Work?</h3>
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </h5>
                  <br />
                  <h3>Complexity</h3>
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </h5>
                  <br />
                  <h3>Some Examples</h3>
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </h5>
                  <br />
                  <h3>For Further Reference</h3>
                  <h5>google.com</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
