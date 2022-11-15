import 'react-tabs/style/react-tabs.css';
import "./CodeSnippet.css";


var Java = '// Optimized java implementation \n// of Bubble sort \nimport java.io.*; \nclass GFG\n{\n\t//An optimized version of Bubble Sort'+
'\n\tstatic void bubbleSort(int arr[], int n){\n\t\tint i, j, temp;\n\t\tboolean swapped;\n\t\tfor (i = 0; i < n - 1; i++){'+
'\n\t\t\tswapped = false;\n\t\t\tfor (j = 0; j < n - i - 1; j++){\n\t\t\t\tif (arr[j] > arr[j + 1]){\n\t\t\t\t\t// swap arr[j] and arr[j+1]\n\t\t\t\t\ttemp = arr[j];\n\t\t\t\t\tarr[j] = arr[j + 1];'+
'\n\t\t\t\t\tarr[j + 1] = temp;\n\t\t\t\t\tswapped = true;\n\t\t\t\t}\n\t\t\t}\n\t\t\t// IF no two elements were\n\t\t\t// swapped by inner loop, then break\n\t\t\tif (swapped == false){break;}'+
'\n\t\t}\n\t}\n}'


var JavaScript = ' function bubblesort(arr, n){\n\tvar i, j, temp;\n\tvar swapped\n\tfor(i = 0; i < n; i++){\n\t\tswapped = false;\n\t\tfor(j = 0; j < n; j++){\n\t\t\tif(arr[j] > arr[j + 1]){\n'+
'\t\t\t\t// swap arr[j] and arr[j+1]\n\t\t\t\ttemp = arr[j];\n\t\t\t\tarr[j] = arr[j + 1];\n\t\t\t\tarr[j + 1] = temp;\n\t\t\t\tswapped = true;\n\t\t\t} \n\t\t}\n\t\t// IF no two elements were\n\t\t// swapped by inner loop, then break\n\t\tif (swapped == false)\n\t\t\tbreak;\n\t}\n} '


var C = '#include <stdio.h>\n#include <stdbool.h>\nvoid swap(int *xp, int *yp){\n\tint temp = *xp;\n\t*xp = *yp;    *yp = temp;\n}' +
'\nvoid bubbleSort(int arr[], int n){\n   int i, j;\n   bool swapped;\n   for (i = 0; i < n-1; i++){\n     swapped = false;\n     for (j = 0; j < n-i-1; j++){\n        if (arr[j] > arr[j+1]){\n           swap(&arr[j], &arr[j+1]);\n           swapped = true;\n        }\n     }\n     // IF no two elements were swapped by inner loop, then break\n     if (swapped == false)\n        break;\n   }\n}'


var Cplusplus = '#include <bits/stdc++.h>\nusing namespace std;\n\n// An optimized version of Bubble Sort\nvoid bubbleSort(int arr[], int n){\n   int i, j;\n   bool swapped;\n   for (i = 0; i < n-1; i++){\n     swapped = false;\n     for (j = 0; j < n-i-1; j++){\n        if (arr[j] > arr[j+1]){\n           swap(arr[j], arr[j+1]);\n           swapped = true;\n        }\n     }\n     // IF no two elements were swapped\n     // by inner loop, then break\n     if (swapped == false)\n        break;\n   }\n}'



var Python = '# Python3 Optimized implementation\n# of Bubble sort\n# An optimized version of Bubble Sort\ndef bubbleSort(arr):\n    n = len(arr)\n    # Traverse through all array elements\n    for i in range(n):\n        swapped = False\n\n        # Last i elements are already\n        #  in place\n        for j in range(0, n-i-1):\n\n            # traverse the array from 0 to\n            # n-i-1. Swap if the element\n             # found is greater than the\n            # next element\n            if arr[j] > arr[j+1] :\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                swapped = True\n\n        # IF no two elements were swapped\n        # by inner loop, then break\n        if swapped == False:\n            break'

export default function CodeSnippet() {
    return (
        <div className={"component"}>
            <h1>Implementations</h1>
            <div className={"container"}>
            <nav className={"bg-secondary rounded-top"}>
                <div className="nav nav-pills" id="nav-tab" role="tablist">
                    <button className="nav-link text-white active" id="nav-java-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-java" type="button" role="tab" aria-controls="nav-java"
                            aria-selected="true">Java
                    </button>
                    <button className="nav-link text-white" id="nav-js-tab" data-bs-toggle="tab" data-bs-target="#nav-js"
                            type="button" role="tab" aria-controls="nav-js" aria-selected="false">JS
                    </button>
                    <button className="nav-link text-white" id="nav-c-tab" data-bs-toggle="tab" data-bs-target="#nav-c"
                            type="button" role="tab" aria-controls="nav-c" aria-selected="false">C
                    </button>
                    <button className="nav-link text-white " id="nav-cplusplus-tab" data-bs-toggle="tab" data-bs-target="#nav-cplusplus"
                            type="button" role="tab" aria-controls="nav-cplusplus" aria-selected="false">C++
                    </button>
                    <button className="nav-link text-white" id="nav-python-tab" data-bs-toggle="tab" data-bs-target="#nav-python"
                            type="button" role="tab" aria-controls="nav-python" aria-selected="false">Python
                    </button>
                </div>
            </nav>
            <div className="tab-content description rounded-bottom" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-java" role="tabpanel"
                     aria-labelledby="nav-java-tab">
                    <code>{Java}</code>
                </div>
                <div className="tab-pane fade" id="nav-js" role="tabpanel" aria-labelledby="nav-js-tab">
                    <code>{JavaScript}</code>
                </div>
                <div className="tab-pane fade" id="nav-c" role="tabpanel" aria-labelledby="nav-c-tab">
                    <code>{C}</code>
                </div>
                <div className="tab-pane fade" id="nav-cplusplus" role="tabpanel" aria-labelledby="nav-cplusplus-tab">
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