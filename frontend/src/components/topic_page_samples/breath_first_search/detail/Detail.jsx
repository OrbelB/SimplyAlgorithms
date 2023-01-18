import './Detail.css';

export default function Detail() {
  return (
    <div className="detail text-center">
      <div className="top p-5">
        <h2>STEPS</h2>
        <div className="size steps_ text-start">
          Pseudocode <br />
          Input: A graph G and a starting vertex root of G<br />
          Output: Goal state. The parent links trace the shortest path back to
          root[8]
          <br />
          1 &nbsp;procedure BFS(G, root) is
          <br />
          2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let Q be a queue
          <br />
          3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label root as explored
          <br />
          4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q.enqueue(root)
          <br />
          5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while Q is not empty do
          <br />
          6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v :=
          Q.dequeue()
          <br />
          7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if v is
          the goal then
          <br />
          8
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return
          v<br />
          9 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for all
          edges from v to w in G.adjacentEdges(v) do
          <br />
          10
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if
          w is not labeled as explored then
          <br />
          11
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label
          w as explored
          <br />
          12
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;w.parent
          := v<br />
          13
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q.enqueue(w)
          <br />
          <br />
          (FOR GRAPHS)
          <br />
          BFS finds the shortest path from s to each vertex. <br />
          Shortest in terms of number of edges not weights. <br />
        </div>
      </div>
      <div className="mid rounded-5 ">
        <h2 className="mb-4">HOW DOES THE ALGORITHM WORKS?</h2>
        <p className="size text-start">
          <h4>
            <b>(TREES)</b>
          </h4>
          BFS is an algorithm for searching a tree data structure for a node
          that satisfies a given property. It starts at the tree root and
          explores all nodes at the present depth prior to moving on to the
          nodes at the next depth level. Extra memory, usually a queue, is
          needed to keep track of the child nodes that were encountered but not
          yet explored. <br />
          <br />
          <h4>
            <b>Graph traversals</b>
          </h4>
          Graph traversal means visiting every vertex and edge exactly once in a
          well-defined order. While using certain graph algorithms, you must
          ensure that each vertex of the graph is visited exactly once. The
          order in which the vertices are visited are important and may depend
          upon the algorithm or question that you are solving. <br />
          <br />
          During a traversal, it is important that you track which vertices have
          been visited. The most common way of tracking vertices is to mark
          them. <br />
          <br />
          <h4>
            <b>Breadth First Search (BFS)</b>
          </h4>
          There are many ways to traverse graphs. BFS is the most commonly used
          approach. <br /> <br />
          BFS is a traversing algorithm where you should start traversing from a
          selected node (source or starting node) and traverse the graph
          layerwise thus exploring the neighbor nodes (nodes which are directly
          connected to source node). You must then move towards the next-level
          neighbor nodes.
        </p>
      </div>
      <div className="container-fluid bot">
        <div className="row justify-content-center mb-4">
          <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
        </div>
        <div className="row justify-content-center text-start">
          <p className="size text-start align-self-center">
            <h4>
              <b>(FOR GRAPHS)</b>
            </h4>
            Implementation of BFS runs in O(m + n) time if the graph is given by
            its adjacency list representation.
            <br />
            <br />
            Time complexity is O(|V|), where |V| is the number of nodes. You
            need to traverse all nodes. Space complexity is O(|V|) as well -
            since at worst case you need to hold all vertices in the queue
          </p>
        </div>
        <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
          <div className="col-auto col-sm-auto align-self-center">
            <h3 className="m-3 mb-4">FURTHER REFERENCES</h3>
            <ul className="size">
              <li>
                <a
                  href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
                  target="_blank"
                  rel="noreferrer"
                >
                  geeksforgeeks - Breadth First Search or BFS for a Graph
                </a>
              </li>
              -
              <li>
                <a
                  href="https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/tutorial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  hackerearth - Breadth First Search
                </a>
              </li>
              -
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Breadth-first_search"
                  target="_blank"
                  rel="noreferrer"
                >
                  wikipedia - Breadth-first search
                </a>
              </li>
            </ul>
          </div>
          <div className="col-auto  text-center vid">
            <iframe
              className="rounded-4 "
              width="auto"
              height="auto"
              src="https://www.youtube.com/embed/pcKY4hjDrxk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
