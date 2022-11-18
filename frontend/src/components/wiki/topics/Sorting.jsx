import { NavLink } from "react-router-dom";

export default function Sorting() {
    return (
        <div className="wikibody">
        <div className="wikititle">SIMPLY ALGORITHMS WIKI</div>
        <div className='wiki-section'>
        <div class="row gutters-sm">
            <div class="col-md-4 d-none d-md-block">
                <div class="card">
                    <div class="card-body">
                        <nav class="nav flex-column nav-pills nav-gap-y-1">
                            {/* SPECIIC TOPIC PAGES WILL BE FILLED OUT LATER*/}
                                <NavLink to="/wikihome"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>WHAT ARE ALGORITHMS?</NavLink>
                                <br/>
                                <NavLink to="/wiki/sorting"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded active"}>SORTING</NavLink>
                                <NavLink to="/wiki/selectionsort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Selection Sort</NavLink>
                                <NavLink to="/wiki/quicksort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Quick Sort</NavLink>
                                <NavLink to="/wiki/bubblesort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Bubble Sort</NavLink>
                                <NavLink to="/wiki/radixsort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Radix Sort</NavLink>
                                <NavLink to="/wiki/trees"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>TREES</NavLink>
                                <NavLink to="/wiki/binarytrees"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Binary Search Trees</NavLink>
                                <NavLink to="/wiki/twotree"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Two Tree</NavLink>
                                <NavLink to="/wiki/threetree"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Three Tree</NavLink>
                                <NavLink to="/wiki/redblacktree"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Red Black</NavLink>
                                <NavLink to="/wiki/graphs"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>GRAPHS</NavLink>
                                <NavLink to="/wiki/breadthfirst"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Breadth-First Search</NavLink>
                                <NavLink to="/wiki/depthfirst"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Depth-First Search</NavLink>
                                <NavLink to="/wiki/topologicalsort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Djikstra Graph</NavLink>
                                <NavLink to="/wiki/djikstra"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Two Tree</NavLink>
                                <NavLink to="/wiki/datastructures"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>DATA STRUCTURES</NavLink>
                                <NavLink to="/wiki/arrays"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Arrays</NavLink>
                                <NavLink to="/wiki/linkedlist"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Linked Lists</NavLink>
                                <NavLink to="/wiki/stack"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Stack</NavLink>
                                <NavLink to="/wiki/queue"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Queue</NavLink>
                            </nav>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header border-bottom mb-3 d-flex d-md-none">
              
                    </div>
                    <div class="card-body tab-content">
                        <div class="tab-pane active" id="profile">
                                <h3>This is an example of how the wiki topic pages will be organized.</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</h5>
                                <br/>
                                <h3>How Do They Work?</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</h5>
                                <br/>
                                <h3>Complexity</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</h5>
                                <br/>
                                <h3>Some Examples</h3>
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</h5>
                                <br/>
                                <h3>For Further Reference</h3>
                                <h5>google.com</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}