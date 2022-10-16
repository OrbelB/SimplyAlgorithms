import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./CodeSnippet.css";
import {useState} from "react";

var Java = ' class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n }'
var JavaScript = ' console.log("Hello World")'
var C = ' #include <stdio.h>\n\tint main() {\n\t\tprintf("Hello world");\n\t\treturn 0;\n\t}';
var Cplusplus = ' #include <iostream>\nint main() {\n\tstd::cout << "Hello world!";\n\treturn 0;\n}'
var Python = ' def Greeting():\n\tprint("Hello World")\n\nGreeting()'

export default function CodeSnippet() {
    const [value, setValue] = useState(0);

    const handleScrollableChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div className="component">
            <h1>CODE IMPLEMENTATION</h1>
            <Tabs value={value}
                  onChange={handleScrollableChange}
                  variant="scrollable"
                  aria-label="scrollable auto tabs example">
                <TabList className='languages'>
                    <Tab label={"Java"}> Java</Tab>
                    <Tab label={"JS"}>JS</Tab>
                    <Tab label={"Python"}>Python</Tab>
                    <Tab label={"C"}>C</Tab>
                    <Tab label={"C++"}>C++</Tab>
                </TabList>
                <div className='description'>
                    <TabPanel className={"m-3"}>
                        <p>
                            {Java}
                        </p>
                    </TabPanel>
                    <TabPanel className={"m-3"}>
                        <p>
                            {JavaScript}
                        </p>
                    </TabPanel>
                    <TabPanel className={"m-3"} >
                        <p>
                            {Python}
                        </p>
                    </TabPanel>
                    <TabPanel className={"m-3"} >
                        <p>
                            {C}
                        </p>
                    </TabPanel>
                    <TabPanel className={"m-3"}>
                        <p>
                            {Cplusplus}
                        </p>
                    </TabPanel>
                </div>
            </Tabs>
            <div className='bottom'></div>
        </div>
    );
}