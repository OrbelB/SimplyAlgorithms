import 'react-tabs/style/react-tabs.css';
import './CodeSnippet.css';

const Cplusplus =
  '// Program to print BFS traversal from a given\n// source vertex. BFS(int s) traverses vertices\n// reachable from s.\n#include<bits/stdc++.h>\nusing namespace std;\n// This class represents a directed graph using\n// adjacency list representation\nclass Graph\n{    int V;    // No. of vertices\n    // Pointer to an array containing adjacency\n    // lists\n    vector<list<int>> adj;\npublic:\n    Graph(int V);  // Constructor\n' +
  '    // function to add an edge to graph\n    void addEdge(int v, int w);\n    // prints BFS traversal from a given source s\n    void BFS(int s); \n};\nGraph::Graph(int V){\n    this->V = V;\n    adj.resize(V);\n}\nvoid Graph::addEdge(int v, int w){    adj[v].push_back(w); // Add w to v’s list.\n}\nvoid Graph::BFS(int s)\n{\n    // Mark all the vertices as not visited\n    vector<bool> visited;\n' +
  '    visited.resize(V,false);\n    // Create a queue for BFS\n    list<int> queue;\n    // Mark the current node as visited and enqueue it\n    visited[s] = true;\n    queue.push_back(s);\n    while(!queue.empty())\n    {\n        // Dequeue a vertex from queue and print it\n        s = queue.front();\n        cout << s << " ";\n        queue.pop_front();\n        // Get all adjacent vertices of the dequeued\n' +
  '        // vertex s. If a adjacent has not been visited,\n        // then mark it visited and enqueue it\n        for (auto adjecent: adj[s])\n        {\n            if (!visited[adjecent])\n            {\n                visited[adjecent] = true;\n                queue.push_back(adjecent);\n            }\n        }\n    }\n}\n// Driver program to test methods of graph class\nint main()' +
  '{\n    // Create a graph given in the above diagram\n    Graph g(4);\n    g.addEdge(0, 1);\n    g.addEdge(0, 2);\n    g.addEdge(1, 2);\n    g.addEdge(2, 0);\n    g.addEdge(2, 3);\n    g.addEdge(3, 3);\n    cout << "Following is Breadth First Traversal "\n         << "(starting from vertex 2);\n    g.BFS(2);\n    return 0;\n}';

const Python =
  '# Python3 Program to print BFS traversal\n# from a given source vertex. BFS(int s)\n# traverses vertices reachable from s.\nfrom collections import defaultdict\n# This class represents a directed graph\n# using adjacency list representation\nclass Graph:\n    # Constructor\n    def __init__(self):\n        # default dictionary to store graph\n        self.graph = defaultdict(list)\n    # function to add an edge to graph\n' +
  '    def addEdge(self,u,v):\n        self.graph[u].append(v)\n    # Function to print a BFS of graph\n    def BFS(self, s):\n        # Mark all the vertices as not visited\n        visited = [False] * (max(self.graph) + 1)\n        # Create a queue for BFS\n        queue = []\n        # Mark the source node as\n        # visited and enqueue it\n        queue.append(s)\n        visited[s] = True\n        while queue:\n' +
  '            # Dequeue a vertex from\n            # queue and print it\n            s = queue.pop(0)\n            print (s, end = " ")\n            # Get all adjacent vertices of the\n            # dequeued vertex s. If a adjacent\n            # has not been visited, then mark it\n            # visited and enqueue it\n            for i in self.graph[s]:\n                if visited[i] == False:\n                    queue.append(i)\n' +
  '                    visited[i] = True\n# Driver code\n# Create a graph given in\n# the above diagram\ng = Graph()\ng.addEdge(0, 1)\ng.addEdge(0, 2)\ng.addEdge(1, 2)\ng.addEdge(2, 0)\ng.addEdge(2, 3)\ng.addEdge(3, 3)\nprint ("Following is Breadth First Traversal"\n                  " (starting from vertex 2)")\ng.BFS(2)';

export default function CodeSnippet() {
  return (
    <div className="component">
      <h1>Implementations</h1>
      <div className="container">
        <nav className="bg-secondary rounded-top">
          <div
            className="nav navbar-code nav-pills"
            id="nav-tab"
            role="tablist"
          >
            <button
              className="nav-link text-white active"
              id="nav-cplusplus-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-cplusplus"
              type="button"
              role="tab"
              aria-controls="nav-cplusplus"
              aria-selected="false"
            >
              C++
            </button>
            <button
              className="nav-link text-white"
              id="nav-python-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-python"
              type="button"
              role="tab"
              aria-controls="nav-python"
              aria-selected="false"
            >
              Python
            </button>
          </div>
        </nav>
        <div
          className="tab-content description rounded-bottom"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-cplusplus"
            role="tabpanel"
            aria-labelledby="nav-cplusplus-tab"
          >
            <code>{Cplusplus}</code>
          </div>
          <div
            className="tab-pane fade"
            id="nav-python"
            role="tabpanel"
            aria-labelledby="nav-python-tab"
          >
            <code>{Python}</code>
          </div>
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
