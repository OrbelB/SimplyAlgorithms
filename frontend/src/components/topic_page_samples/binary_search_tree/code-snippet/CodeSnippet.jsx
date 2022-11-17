import 'react-tabs/style/react-tabs.css';
import "./CodeSnippet.css";


var Java = ' class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n }'
var JavaScript = ' console.log("Hello World")'
var C = ' #include <stdio.h>\n\tint main() {\n\t\tprintf("Hello world");\n\t\treturn 0;\n\t}';
var Cplusplus = ' #include <iostream>\nint main() {\n\tstd::cout << "Hello world!";\n\treturn 0;\n}'
var Python = ' def Greeting():\n\tprint("Hello World")\n\nGreeting()'

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