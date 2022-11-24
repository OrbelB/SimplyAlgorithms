import "./Detail.css"

export default function Detail() {
    return (
        <div className="detail text-center">
            <div className="mid rounded-5 rounded-top">
                <h2 className={"mb-4"}>What is an Array?</h2>
                <p className={"size font-weight-normal text-start"}>
                In computer science, an array is a data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key. An array is stored such that the position of each element can be computed from its index tuple by a mathematical formula.The simplest type of data structure is a linear array, also called one-dimensional array.
                <br /><br />
                For simplicity, we can think of an array as a fleet of stairs where on each step is placed a value (let’s say one of your friends). Here, you can identify the location of any of your friends by simply knowing the count of the step they are on. Remember: “Location of next index depends on the data type we use”.
                <br /><br />
                Arrays are useful mostly because the element indices can be computed at run time. Among other things, this feature allows a single iterative statement to process arbitrarily many elements of an array. For that reason, the elements of an array data structure are required to have the same size and should use the same data representation. The set of valid index tuples and the addresses of the elements (and hence the element addressing formula) are usually,[3][5] but not always,[2] fixed while the array is in use.
                <br /><br />
                The term "array" may also refer to an array data type, a kind of data type provided by most high-level programming languages that consists of a collection of values or variables that can be selected by one or more indices computed at run-time. Array types are often implemented by array structures; however, in some languages they may be implemented by hash tables, linked lists, search trees, or other data structures.
                <br /><br />
                </p>
                <h2 className={"mb-4"}>Array in C/ C++</h2>
                <p className={"size text-start"}>
                It is a group of variables of similar data types referred to by a single element.
Its elements are stored in a contiguous memory location.
The size of the array should be mentioned while declaring it.
Array elements are always counted from zero (0) onward.
Array elements can be accessed using the position of the element in the array.
The array can have one or more dimensions.

                </p>
            </div>
            <div className="container-fluid bot">
                <div className={"row justify-content-around  mt-auto mt-sm-5 p-2"}>
                    <div className={"col-sm-auto align-self-center"}>
                        <h2 className={"m-3 mb-4"}>FURTHER REFERENCES</h2>
                        <ul className="size">
                            <li><a href="https://en.wikipedia.org/wiki/Array_(data_structure)" target="_blank" rel="noreferrer">Wiki - Array (data structure)</a></li>
                            -
                            <li><a href="https://www.w3schools.com/java/java_arrays.asp" target="_blank" rel="noreferrer">W3 - Java Arrays</a></li>
                            -
                            <li><a href="https://www.geeksforgeeks.org/introduction-to-arrays/" target="_blank" rel="noreferrer">geeksforgeeks - What is Array?</a></li>
                            -
                            <li><a href="https://www.geeksforgeeks.org/multidimensional-arrays-c-cpp/" target="_blank" rel="noreferrer">geeksforgeeks - Multidimensional Arrays in C / C++</a></li>
                        </ul>
                    </div>
                    <div className={"col-auto  text-center vid"}>
                        <iframe className="rounded-4 " width="auto" height="auto"
                                src="https://www.youtube.com/embed/NptnmWvkbTw" title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}