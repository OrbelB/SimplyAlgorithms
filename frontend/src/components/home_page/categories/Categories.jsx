import "./Categories.css"

export default function Categories() {
    return (
        <div className="wrap-collabsible"> 

        <div className="space"></div>
            <input id="collapsible" className="toggle row1" type="checkbox"/> 
                <label for="collapsible" className="lbl-toggle cat1">Sorting</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button className="topic">SELECTION SORT</button>
                            <button className="topic">QUICK SORT</button>
                            <br/><br/>
                            <button className="topic">INSERTION SORT</button>
                            <button className="topic">HEAP SORT</button>
                        </div>
                    </div>

        <div className="space"></div>
            
            <input id="collapsible2" className="toggle row1" type="checkbox"/> 
                <label for="collapsible2" className="lbl-toggle cat2">Trees</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button className="topic">BINARY TREES</button>
                            <button className="topic">TWO-TREE</button>
                            <br/><br/>
                            <button className="topic">THREE-TREE</button>
                            <button className="topic">RED-BLACK</button>
                        </div>
                    </div>

        <div className="space"></div>

            <input id="collapsible3" className="toggle" type="checkbox"/> 
                <label for="collapsible3" className="lbl-toggle cat3">Graphs</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button className="topic">BREADTH-FIRST SEARCH</button>
                            <button className="topic">DEPTH FIRST SEARCH</button>
                            <br/><br/>
                            <button className="topic">TOPOLOGICAL SORT</button>
                            <button className="topic">DJISKTRA GRAPH</button>
                        </div>
                    </div>

        <div className="space"></div>    
        
            <input id="collapsible4" className="toggle" type="checkbox"/> 
                <label for="collapsible4" className="lbl-toggle cat4">Data Structures</label>
                    <div className="collapsible-content">
                        <div className="content-inner">
                            <button className="topic">ARRAY</button>
                            <button className="topic">LINKED LIST</button>
                            <br/><br/>
                            <button className="topic">STACK</button>
                            <button className="topic">QUEUE</button>
                        </div>
                    </div>
            
            <div className="bottom"></div>

        </div>
    )
}

