import { NavLink } from 'react-router-dom';

export default function WTrees() {
  return (
    <div className="wikibody">
      <div className="wikititle">TREE ALGORITHMS</div>
      <div className="wiki-section">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <NavLink
                    to="/search/binarysearchtree"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Binary Search Trees
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Two Tree
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Three Tree
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Red Black
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
                  <h3>What are Tree Algorithms?</h3>
                  <h5>
                    Unlike linear data structures (linked list, stack, queue), a
                    tree is a hierarchical, non-linear data structure composed
                    of one or more nodes (or no node at all). One node of a tree
                    is directly or indirectly connected to every other node
                    without forming a cycle. Three nodes A, B, C will form a
                    cycle if node A is connected to node B and node B is
                    connected to C, and also node C is again connected to node
                    A. A node is a structure that may contain a value or a
                    condition or a separate data structure like an array, linked
                    list, or even a tree. Each node of the tree can have zero or
                    more child nodes, but each child node will have only one
                    parent node (except the root node, which has no parent).
                    There can be multiple ancestors to a node (like a parent,
                    grandparent, and so on).
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
