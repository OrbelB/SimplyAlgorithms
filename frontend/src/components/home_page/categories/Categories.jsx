import "./Categories.css"

export default function Categories() {
    return (
        <div className="wrap-collabsible"> 
            <input id="collapsible" className="toggle" type="checkbox"/> 
                <label for="collapsible" className="lbl-toggle cat1">Sorting</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button>Insertion Sort</button>
                            <br/>
                            <button>Heap Sort</button>
                        </div>
                    </div>

            
            <input id="collapsible2" className="toggle" type="checkbox"/> 
                <label for="collapsible2" className="lbl-toggle cat2">Search</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button>Linear Search</button>
                            <br/>
                            <button>Binary Search</button>
                        </div>
                    </div>


            <input id="collapsible3" className="toggle" type="checkbox"/> 
                <label for="collapsible3" className="lbl-toggle cat3">Graphs</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button>Breadth-First Search</button>
                            <br/>
                            <button>Depth-First Search</button>
                        </div>
                    </div>

            
            <input id="collapsible4" className="toggle" type="checkbox"/> 
                <label for="collapsible4" className="lbl-toggle cat4">Data Structures</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button>Arrays</button>
                            <br/>
                            <button>Stacks</button>
                        </div>
                    </div>

        </div>
    )
}

