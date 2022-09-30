import Detail from './components/ui/Detail'
import AlgoFrame from './components/ui/AlgoFrame'
import CodeSnippet from './components/ui/CodeSnippet'
import MainNavigation from "./components/ui/MainNavigation";

function App() {
  return (
    <div className="App">
        <MainNavigation/>
        <AlgoFrame/>
        <Detail />
        <CodeSnippet/>
    </div>
  );
}

export default App;
