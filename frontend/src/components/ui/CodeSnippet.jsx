import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./CodeSnippet.css";

var Java = ' class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n }'
var JavaScript = ' console.log("I HATE MY LIFE")'
var C = ' #include <stdio.h>\n\tint main() {\n\t\tprintf("Hello world");\n\t\treturn 0;\n\t}';
var Cplusplus = ' #include <iostream>\nint main() {\n\tstd::cout << "Hello world!";\n\treturn 0;\n}'
var Python = ' def JoeMama():\n\tprint("yo mama")\n\nJoeMama()'
 
export default function CodeSnippet() {
    return (
      <div className="component">
        <h1>Code Implementation</h1>
        <Tabs>
          <TabList className='languages'>
            <Tab>Java</Tab>
            <Tab>JS</Tab>
            <Tab>Python</Tab>
            <Tab>C</Tab>
            <Tab>C++</Tab>
          </TabList>
        <div className='description'>
            <TabPanel>
              <p>
                {Java}
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                {JavaScript}
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                {Python}
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                {C}
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                {Cplusplus}
              </p>
            </TabPanel>
        </div>
      </Tabs>
  </div>
    );
}