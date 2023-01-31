import { NavLink } from 'react-router-dom';

export default function WSorting() {
  return (
    <div className="wikibody">
      <div className="wikititle">SORTING ALGORITHMS</div>
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
                    Selection Sort
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Quick Sort
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Bubble Sort
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Radix Sort
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
                  <h3>What are Sorting Algorithms?</h3>
                  <h5>
                    In computer science, a sorting algorithm is an algorithm
                    that puts elements of a list into an order. The most
                    frequently used orders are numerical order and
                    lexicographical order, and either ascending or descending.
                    Efficient sorting is important for optimizing the efficiency
                    of other algorithms (such as search and merge algorithms)
                    that require input data to be in sorted lists. Sorting is
                    also often useful for canonicalizing data and for producing
                    human-readable output. Formally, the output of any sorting
                    algorithm must satisfy two conditions: The output is in
                    monotonic order (each element is no smaller/larger than the
                    previous element, according to the required order). The
                    output is a permutation (a reordering, yet retaining all of
                    the original elements) of the input. For optimum efficiency,
                    the input data should be stored in a data structure which
                    allows random access rather than one that allows only
                    sequential access.
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
