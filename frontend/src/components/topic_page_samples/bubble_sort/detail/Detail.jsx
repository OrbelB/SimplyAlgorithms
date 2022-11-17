import "./Detail.css"

export default function Detail() {
    return (
        <div className="detail text-center">
            <div className="top p-5">
                <h2>STEPS</h2>
                <div className={"row justify-content-center text-center"}>
                    <p> 
                        Take an array of numbers "5 1 4 2 8", and sort the array from lowest number to greatest number using bubble sort. 
                        In each step, elements written in <b>bold</b> are being compared. Three passes will be required;
                        <br/><br/>
                    </p>
                </div>
                <div className="steps_ text-start">
                    <b>First Pass: </b> <br />
                    <b>(1)</b> (<b> 5 1 </b> 4 2 8 ) → ( <b>1 5</b> 4 2 8 ), Here, algorithm compares the first two elements, and swaps since 5 > 1. <br />
                    <b>(2)</b> ( 1 <b>5 4</b> 2 8 ) → ( 1 <b>4 5 </b>2 8 ), Swap since 5 > 4 <br />
                    <b>(3)</b> ( 1 4 <b>5 2 </b>8 ) → ( 1 4 <b>2 5</b> 8 ), Swap since 5 > 2 <br />
                    <b>(4)</b> ( 1 4 2 <b>5 8</b> ) → ( 1 4 2 <b>5 8</b> ), Now, since these elements are already in order (8 > 5), algorithm does not swap them. <br />
                    <br />
                    <b>Second pass</b><br />
                    <b>(1) </b>(<b> 1 4 </b> 2 5 8 ) → ( <b> 1 4 </b> 2 5 8 ) nothing swaped <br />
                    <b>(2) </b>( 1 <b> 4 2 </b> 5 8 ) → ( 1 <b> 2 4 </b> 5 8 ), Swap since 4 > 2 <br />
                    <b>(3) </b>( 1 2 <b> 4 5 </b> 8 ) → ( 1 2 <b> 4 5 </b> 8 ) nothing swaped<br />
                    <b>(4) </b>( 1 2 4 <b> 5 8 </b> ) → ( 1 2 4 <b> 5 8 </b> ) nothing swaped<br />
                    Now, the array is already sorted, but the algorithm does not know if it is completed. 
                    The algorithm needs one additional whole pass without any swap to know it is sorted.
                    <br /><br />
                    <b>Third Pass</b> <br />
                    <b>(1) </b>( <b> 1 2 </b> 4 5 8 ) → ( <b> 1 2 </b> 4 5 8 ) Nothing swapped<br /> 
                    <b>(2) </b>( 1 <b> 2 4 </b> 5 8 ) → ( 1 <b> 2 4 </b> 5 8 ) Nothing swapped<br />
                    <b>(3) </b>( 1 2 <b> 4 5 </b> 8 ) → ( 1 2 <b> 4 5 </b> 8 ) Nothing swapped<br />
                    <b>(4) </b>( 1 2 4 <b> 5 8 </b> ) → ( 1 2 4 <b> 5 8 </b> ) Nothing swapped<br />
                    Since nothing swapped the bubble sort algorithm stops

                </div>
                
                
            </div>
            <div className="mid rounded-5 ">
                <h2 className={"mb-4"}>HOW DOES THE ALGORITHM WORKS?</h2>
                <p className={"text-center"}>
                One of the easiest algorithms to implement as a beginner and it works by repeatedly swapping the adjacent elements if they are in the wrong order. 
                However, this algorithm should not be used for large data due to its bad time complexity. <br/><br/>

                Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through 
                the input list element by element, comparing the current element with the one after it, swapping their values if needed. 
                These passes through the list are repeated until no swaps had to be performed during a pass, meaning that the list has become fully sorted.
                The algorithm, which is a comparison sort, is named for the way the larger elements "bubble" up to the top of the list.<br/><br/>
                This simple algorithm performs poorly in real world use and is used primarily as an educational tool. More efficient algorithms such as quicksort,
                 timsort, or merge sort are used by the sorting libraries built into popular programming languages such as Python and Java

                </p>
            </div>
            <div className="container-fluid bot">
                <div className={"row justify-content-center mb-4"}>
                    <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
                </div>
                <div className={"row justify-content-center text-center"}>
                    <div>
                    Bubble sort is a brute force algorithm and should not really be used for applications that have large datasets that need to be sorted <br/>-<br/>
                            Worst Case Time Complexity [ Big-O ]: O(n^2) <br/>
                            Best Case Time Complexity [Big-omega]: O(n)<br/>
                            Average Time Complexity [Big-theta]: O(n^2)<br/>
                            Space Complexity: O(1) 

                    </div>
                </div>
                <div className={"row justify-content-around  mt-auto mt-sm-5   p-2"}>
                    <div className={"col-auto col-sm-auto align-self-center"}>
                        <h3 className={"m-3 mb-4"}>FURTHER REFERENCES</h3>
                        <ul>
                            <li><a href="https://www.freecodecamp.org/news/bubble-sort-algorithm-in-java-cpp-python-with-example-code/" target="_blank" rel="noreferrer">Bubble Sort – Algorithm in Java, C++, Python with Example Code by Kolade Chrise</a></li>
                            -
                            <li><a href="https://www.geeksforgeeks.org/bubble-sort/" target="_blank" rel="noreferrer">geeksforgeeks - Bubble Sort Algorithm</a></li>
                            -
                            <li><a href="https://en.wikipedia.org/wiki/Bubble_sort" target="_blank" rel="noreferrer">wikipedia - Bubble sort</a></li>
                        </ul>
                    </div>
                    <div className={"col-auto  text-center vid"}>
                        <iframe className="rounded-4 " width="auto" height="auto"
                                src="https://www.youtube.com/embed/uJLwnsLn0_Q" title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}