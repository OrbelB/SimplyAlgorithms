import { NavLink } from "react-router-dom";
import "./WikiStyles.css"

export default function Sorting() {
    return (
        <div className="wikibody">
        <h1>SIMPLY ALGORITHMS WIKI</h1>
        <div className='wiki-section'>
        <div class="row gutters-sm">
            <div class="col-md-4 d-none d-md-block">
                <div class="card">
                    <div class="card-body">
                        <nav class="nav flex-column nav-pills nav-gap-y-1">
                            <NavLink to="/wikihome"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>WHAT ARE ALGORITHMS?</NavLink>
                            <br/>
                            <NavLink to="/wiki/sorting"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded active"}>SORTING</NavLink>
                            <NavLink to="/wiki/sorting/selectionsort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Selection Sort</NavLink>
                            <NavLink to="/wiki/sorting/quicksort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Quick Sort</NavLink>
                            <NavLink to="/wiki/bubblesort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Bubble Sort</NavLink>
                            <NavLink to="/wiki/radixsort"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Radix Sort</NavLink>
                            <NavLink to="/wiki/trees"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>TREES</NavLink>
                            <NavLink to="/wiki/trees/binarytrees"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Binary Trees</NavLink>
                            <NavLink to="/wiki/trees/twotrees"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Two Trees</NavLink>
                            <NavLink to="/wiki/graphs"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>GRAPHS</NavLink>
                            <NavLink to="/wiki/graphs/breadthfirst"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Breadth-First Search</NavLink>
                            <NavLink to="/wiki/graphs/depthfirst"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Depth-First Search</NavLink>
                            <NavLink to="/wiki/datastructures"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded"}>DATA STRUCTURES</NavLink>
                            <NavLink to="/wiki/arrays"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Arrays</NavLink>
                            <NavLink to="/wiki/linkedlist"  data-toggle="tab" className={"nav-item nav-link has-icon nav-link-faded indent"}>Linked Lists</NavLink>
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
                            <h3>What Are Sorting Algorithms?</h3>
                            <hr/>
                            <h6>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur”</h6>
                            <br/>
                            <h3>How Do They Work?</h3>
                            <hr/>
                            <h6>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur”</h6>
                            <br/>
                            <h3>Some Examples of Sorting Algorithms</h3>
                            <hr/>
                            <h6>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur”</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}