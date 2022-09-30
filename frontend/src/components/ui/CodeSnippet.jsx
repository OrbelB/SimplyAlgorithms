import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function CodeSnippet() {
    return (
        <Tabs align="center">
    <TabList>
      <Tab>C</Tab>
      <Tab>C++</Tab>
      <Tab>Java</Tab>
      <Tab>JS</Tab>
      <Tab>Python</Tab>
    </TabList>

    <TabPanel>
      <p>
        Code will go here
      </p>
    </TabPanel>
    <TabPanel>
      <p>
        Code will go here
      </p>
    </TabPanel>
    <TabPanel>
      <p>
        Code will go here
      </p>
    </TabPanel>
    <TabPanel>
      <p>
        Code will go here
      </p>
    </TabPanel>
    <TabPanel>
      <p>
       Code will go here
      </p>
    </TabPanel>
  </Tabs>
    );
}