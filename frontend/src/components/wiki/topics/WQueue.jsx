import { NavLink } from 'react-router-dom';

export default function WQueue() {
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
                    to="/wiki"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded fs"
                  >
                    WHAT ARE ALGORITHMS?
                  </NavLink>
                  <br />
                  <NavLink
                    to="/sorting"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded fs"
                  >
                    SORTING
                  </NavLink>
                  <NavLink
                    to="/sorting/selectionsort"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Selection Sort
                  </NavLink>
                  <NavLink
                    to="/sorting/quicksort"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Quick Sort
                  </NavLink>
                  <NavLink
                    to="/sorting/bubblesort"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Bubble Sort
                  </NavLink>
                  <NavLink
                    to="/sorting/radixsort"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Radix Sort
                  </NavLink>
                  <NavLink
                    to="/trees"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded fs"
                  >
                    TREES
                  </NavLink>
                  <NavLink
                    to="/trees/binarysearch"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Binary Search Trees
                  </NavLink>
                  <NavLink
                    to="/trees/twotree"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Two Tree
                  </NavLink>
                  <NavLink
                    to="/trees/threetree"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Three Tree
                  </NavLink>
                  <NavLink
                    to="/trees/redblacktree"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Red Black
                  </NavLink>
                  <NavLink
                    to="/graphs"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded fs"
                  >
                    GRAPHS
                  </NavLink>
                  <NavLink
                    to="/graphs/breadthfirst"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Breadth-First Search
                  </NavLink>
                  <NavLink
                    to="/graphs/depthfirst"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Depth-First Search
                  </NavLink>
                  <NavLink
                    to="/graphs/topological"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Topological Sort
                  </NavLink>
                  <NavLink
                    to="/graphs/djikstra"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Djikstra Graph
                  </NavLink>
                  <NavLink
                    to="/datastructures"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded fs"
                  >
                    DATA STRUCTURES
                  </NavLink>
                  <NavLink
                    to="/datastructures/arrays"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Arrays
                  </NavLink>
                  <NavLink
                    to="/datastructures/linkedlist"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Linked Lists
                  </NavLink>
                  <NavLink
                    to="/datastructures/stack"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Stack
                  </NavLink>
                  <NavLink
                    to="/datastructures/queue"
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
                  <h3>What are Queues?</h3>
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
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
