import { NavLink } from 'react-router-dom';

export default function WGraphs() {
  return (
    <div className="wikibody">
      <div className="wikititle">GRAPH ALGORITHMS</div>
      <div className="wiki-section">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <NavLink
                    to="/search/bfs"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Breadth-First Search
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Depth-First Search
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Topological Sort
                  </NavLink>
                  <NavLink
                    to="/underconstruction"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded indent fs"
                  >
                    Djikstra Graph
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
                  <h3>What are Graph Algorithms?</h3>
                  <h5>
                    A Graph is a non-linear data structure consisting of
                    vertices and edges. The vertices are sometimes also referred
                    to as nodes and the edges are lines or arcs that connect any
                    two nodes in the graph. More formally a Graph is composed of
                    a set of vertices( V ) and a set of edges( E ). The graph is
                    denoted by G(E, V).
                    <br />
                    <br />
                    Graphs are used to solve many real-life problems. Graphs are
                    used to represent networks. The networks may include paths
                    in a city or telephone network or circuit network. Graphs
                    are also used in social networks like linkedIn, Facebook.
                    For example, in Facebook, each person is represented with a
                    vertex(or node). Each node is a structure and contains
                    information like person id, name, gender, locale etc.
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
