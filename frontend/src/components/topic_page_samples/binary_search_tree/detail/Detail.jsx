import "./Detail.css"

export default function Detail() {
    return (
        <div className="detail text-center">
            <div className="top p-5">
                <h2>SEARCH STEPS</h2>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item border-0">Start from the root.
                    </li>
                    <li className="list-group-item border-0">Compare the searching element with root, if less than root, then recursively call left subtree, else recursively call right subtree. 
                    </li>
                    <li className="list-group-item border-0">If the element to search is found anywhere, return true, else return false.
                    </li>
                </ol>
                <br />
                <h2>INSERTION STEPS</h2>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item border-0">Start from the root.
                    </li>
                    <li className="list-group-item border-0">Compare the inserting element with root, if less than root, then recursively call left subtree, else recursively call right subtree. </li>
                    <li className="list-group-item border-0"> After reaching the end, just insert that node at left(if less than current) or else right.
                    </li>
                </ol>
                <br />
                <h2>DELETION STEPS:</h2>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item border-0">Node to be deleted is the leaf: Simply remove from the tree.</li>
                    <li className="list-group-item border-0">Node to be deleted has only one child: Copy the child to the node and delete the child </li>
                    <li className="list-group-item border-0"> Node to be deleted has two children: Find inorder successor of the node. Copy contents of the inorder successor to the node and delete the inorder successor. Note that inorder predecessor can also be used.</li>
                </ol>
                <b>The important thing to note is, inorder successor is needed only when the right child is not empty. In this particular case, inorder successor can be obtained by finding the minimum value in the right child of the node.</b>
            </div>
            <div className="mid rounded-5 ">
                <h2 className={"mb-4"}>HOW DOES THE ALGORITHM WORKS?</h2>
                <p className={"text-start"}>
                    A binary Search Tree is a node-based binary tree data structure which has the following properties: <br />
                    1) The left subtree of a node contains only nodes with keys lesser than the node’s key. <br />
                    2) The right subtree of a node contains only nodes with keys greater than the node’s key. <br />
                    3) The left and right subtree each must also be a binary search tree. <br />
                    4) There must be no duplicate nodes. <br /> <br />

                    <b>How to search a key in given Binary Tree?</b> <br />
                    
                    For searching a value, if we had a sorted array we could have performed a binary search. Let’s say we want to search a number in the array, in binary search, we first define the complete list as our search space, the number can exist only within the search space. Now we compare the number to be searched or the element to be searched with the middle element (median) of the search space and if the record being searched is less than the middle element, we go searching in the left half, else we go searching in the right half, in case of equality we have found the element. In binary search, we start with ‘n’ elements in search space and if the mid element is not the element that we are looking for, we reduce the search space to ‘n/2’ we keep reducing the search space until we either find the record that we are looking for or we get to only one element in search space and be done with this whole reduction. 
                    <br /><br />
                    A new key is always inserted at the leaf. We start searching for a key from the root until we hit a leaf node. Once a leaf node is found, the new node is added as a child of the leaf node.
                    <br /><br />
When we delete a node, three possibilities arise. 



                </p>
            </div>
            <div className="container-fluid bot">
                <div className={"row justify-content-center mb-4"}>
                    <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
                </div>
                <div className={"row justify-content-center text-start"}>
                    <h4>Searching:</h4>
                    <p className={"text-start align-self-center"}>
                    For searching element 1, we have to traverse all elements (in order 3, 2, 1). Therefore, searching in binary search tree has worst case complexity of O(n). In general, time complexity is O(h) where h is height of BST.
                    </p>
                    <h4>Insertion:</h4>
                    <p className={"text-start align-self-center"}>
                    For inserting element 0, it must be inserted as left child of 1. Therefore, we need to traverse all elements (in order 3, 2, 1) to insert 0 which has worst case complexity of O(n). In general, time complexity is O(h).
                    </p>
                    <h4>Deletion:</h4>
                    <p className={"text-start align-self-center"}>
                    For deletion of element 1, we have to traverse all elements to find 1 (in order 3, 2, 1). Therefore, deletion in binary tree has worst case complexity of O(n). In general, time complexity is O(h).
                    </p>

                </div>
                <div className={"row justify-content-around  mt-auto mt-sm-5   p-2"}>
                <div className={"col-auto col-sm-auto align-self-center"}>
                        <h3 className={"m-3 mb-4"}>FURTHER REFERENCES</h3>
                        <ul>
                            <li><a href="https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/" target="_blank">geeksforgeeks - Binary Search Tree | Set 1 (Search and Insertion) (data structure)</a></li>
                            -
                            <li><a href="https://www.geeksforgeeks.org/deletion-in-binary-search-tree/" target="_blank">geeksforgeeks - Deletion in Binary Search Tree</a></li>
                            -
                            <li><a href="https://en.wikipedia.org/wiki/Binary_tree" target="_blank">wikipedia - Binary tree</a></li>
                        </ul>
                    </div>
                    <div className={"col-auto  text-center vid"}>
                        <iframe className="rounded-4 " width="auto" height="auto"
                                src="https://www.youtube.com/embed/jDM6_TnYIqE" title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}