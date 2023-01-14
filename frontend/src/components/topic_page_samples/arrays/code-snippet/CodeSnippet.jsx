import 'react-tabs/style/react-tabs.css';
import './CodeSnippet.css';

const Java =
  'public static void main (String[] args){\n  // Creating an integer array\n  // named arr of size 10.\n  int[] arr = new int[10];\n  // accessing element at 0 index\n  // and setting its value to 5.\n' +
  '  arr[0] = 5;\n  // access and print value at 0\n  // index we get the output as 5.\n  System.out.println(arr[0]);\n}';

const Python = 'cars = ["Ford", "Volvo", "BMW"]\ncars[0]';

const Cplusplus =
  '#include <iostream>\nusing namespace std;\nint main()\n{\n    // Creating an integer array\n    // named arr of size 10.\n    int arr[10];\n    //how to fill an array\n    for(int i = 0; i < 10;i++) {arr[i] = i}\n    // accessing element at 0 index\n' +
  '    // and setting its value to 5.\n    arr[0] = 5;\n    // access and print value at 0\n    // index we get the output as 5.\n    cout << arr[0];\n    return 0;\n}';

const JavaScript = 'const cars = ["Saab", "Volvo", "BMW"];\ncars[0]';

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
              id="nav-java-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-java"
              type="button"
              role="tab"
              aria-controls="nav-java"
              aria-selected="true"
            >
              Java
            </button>
            <button
              className="nav-link text-white"
              id="nav-js-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-js"
              type="button"
              role="tab"
              aria-controls="nav-js"
              aria-selected="false"
            >
              JS
            </button>
            <button
              className="nav-link text-white "
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
            id="nav-java"
            role="tabpanel"
            aria-labelledby="nav-java-tab"
          >
            <code>{Java}</code>
          </div>
          <div
            className="tab-pane fade"
            id="nav-js"
            role="tabpanel"
            aria-labelledby="nav-js-tab"
          >
            <code>{JavaScript}</code>
          </div>

          <div
            className="tab-pane fade"
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
