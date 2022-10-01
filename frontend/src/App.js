import Detail from './components/ui/Detail'
import AlgoFrame from './components/ui/AlgoFrame'
import CodeSnippet from './components/ui/CodeSnippet'
import MainNavigation from "./components/ui/MainNavigation";
import Alg_vis_btns from './components/ui/alg_vis_btns/Alg_vis_btns'

function App() {
  return (
    <div className="App">
        <MainNavigation/>
        <AlgoFrame/>
        <Alg_vis_btns/>
        <Detail />
        <CodeSnippet/>
    </div>
  );
}

export default App;
