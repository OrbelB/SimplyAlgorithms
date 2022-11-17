import 'react-tabs/style/react-tabs.css';
import "./CodeSnippet.css";


var Cplusplus = 
'#include <iostream>\n'
+'using namespace std;\n\n'
+'class BST {\n'
+'    int data;\n'
+'    BST *left, *right;\n\n'
 
+'public:\n'
+'    // Default constructor.\n'
+'    BST();\n\n'
+'    // Parameterized constructor.\n'
+'    BST(int);\n\n' 
+'    // Insert function.\n'
+'    BST* Insert(BST*, int);\n\n'
+'    // Inorder traversal.\n'
+'    void Inorder(BST*);\n'
+'};\n\n'
 
+'// Default Constructor definition.\n'
+'BST ::BST()\n'
+'    : data(0)\n'
+'    , left(NULL)\n'
+'    , right(NULL)\n'
+'{}\n\n'
 
+'// Parameterized Constructor definition.\n'
+'BST ::BST(int value)\n{\n'
+'    data = value;\n'
+'    left = right = NULL;\n'
+'}\n\n' 
+'// Insert function definition.\n'
+'BST* BST ::Insert(BST* root, int value){\n'
+'    if (!root) {\n'
+'        // Insert the first node, if root is NULL.\n'
+'        return new BST(value);\n'
+'    }\n'
+'    // Insert data.\n'
+'    if (value > root->data) {\n'
+'        // Insert right node data, if the \'value\' \n'
+'        // to be inserted is greater than \'root\' node data.\n'
+'        // Process right nodes.\n'
+'        root->right = Insert(root->right, value);\n'
+'    }\n'
+'    else if (value < root->data){\n'
+'        // Insert left node data, if the \'value\' \n'
+'        // to be inserted is smaller than \'root\' node data.\n'
+'        // Process left nodes.\n'
+'        root->left = Insert(root->left, value);\n'
+'    }\n'
+'    // Return \'root\' node, after insertion. \n'
+'    return root;\n'
+'}\n\n'
+'// Inorder traversal function.\n'
+'// This gives data in sorted order.\n'
+'void BST ::Inorder(BST* root)\{'
+'    if (!root) {\n'
+'        return;\n'
+'    }\n'
+'    Inorder(root->left);\n'
+'    cout << root->data << endl;\n'
+'    Inorder(root->right);\n'
+'}\n\n'
 
+'int main(){\n'
+'    BST b, *root = NULL;\n'
+'    root = b.Insert(root, 50);\n'
+'    b.Insert(root, 30);\n'
+'    b.Insert(root, 20);\n'
+'    b.Insert(root, 40);\n'
+'    b.Insert(root, 70);\n'
+'    b.Insert(root, 60);\n'
+'    b.Insert(root, 80);\n\n' 
+'    b.Inorder(root);\n'
+'    return 0;\n'
+'}'



var Python = 
'# Python program to demonstrate\n'
+'# insert operation in binary search tree\n\n'
 
+'# A utility class that represents\n'
+'# an individual node in a BST\n\n'
+'class Node:\n'
+'    def __init__(self, key):\n'
+'        self.left = None\n'
+'        self.right = None\n'
+'        self.val = key\n\n'
 
+'# A utility function to insert\n'
+'# a new node with the given key\n\n'
 
+'def insert(root, key):\n'
+'    if root is None:\n'
+'        return Node(key)\n'
+'    else:\n'
+'        if root.val == key:\n'
+'            return root\n'
+'        elif root.val < key:\n'
+'            root.right = insert(root.right, key)\n'
+'        else:\n'
+'            root.left = insert(root.left, key)\n'
+'    return root\n\n'
 
+'# A utility function to do inorder tree traversal\n\n'
 
+'def inorder(root):\n'
+'    if root:\n'
+'        inorder(root.left)\n'
+'        print(root.val)\n'
+'        inorder(root.right)\n\n'
 
 
+'# Driver program to test the above functions\n'
+'# Let us create the following BST\n'
+'#    50 \n'
+'#  /     \\ \n'
+'# 30     70 \n'
+'# / \\    / \\ \n'
+'# 20 40 60 80\n\n'
+'r = Node(50)\n'
+'r = insert(r, 30)\n'
+'r = insert(r, 20)\n'
+'r = insert(r, 40)\n'
+'r = insert(r, 70)\n'
+'r = insert(r, 60)\n'
+'r = insert(r, 80)\n\n' 
+'# Print inoder traversal of the BST\n'
+'inorder(r)'


export default function CodeSnippet() {
    return (
        <div className={"component"}>
            <h1>Implementations</h1>
            <div className={"container"}>
            <nav className={"bg-secondary rounded-top"}>
                <div className="nav nav-pills" id="nav-tab" role="tablist">
                    <button className="nav-link text-white active" id="nav-cplusplus-tab" data-bs-toggle="tab" data-bs-target="#nav-cplusplus"
                            type="button" role="tab" aria-controls="nav-cplusplus" aria-selected="false">C++
                    </button>
                    <button className="nav-link text-white" id="nav-python-tab" data-bs-toggle="tab" data-bs-target="#nav-python"
                            type="button" role="tab" aria-controls="nav-python" aria-selected="false">Python
                    </button>
                </div>
            </nav>
            <div className="tab-content description rounded-bottom" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-cplusplus" role="tabpanel" aria-labelledby="nav-cplusplus-tab">
                    <code>{Cplusplus}</code>
                </div>
                <div className="tab-pane fade" id="nav-python" role="tabpanel" aria-labelledby="nav-python-tab">
                    <code>{Python}</code>
                </div>
            </div>
            </div>
            <div className='bottom'></div>
        </div>
    );
}