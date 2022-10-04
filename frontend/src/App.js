import Detail from './components/ui/Detail'
import AlgoFrame from './components/ui/algo-frame/AlgoFrame'
import CodeSnippet from './components/ui/code-snippet/CodeSnippet'
import MainNavigation from "./components/ui/main-navigation/MainNavigation";
import Alg_vis_btns from './components/ui/alg_vis_btns/Alg_vis_btns'
import CommentFrame from "./components/ui/comment/CommentFrame";

function App() {
  return (
    <div className="App">
        <MainNavigation/>
        <AlgoFrame/>
        <Alg_vis_btns/>
        <Detail />
        <CodeSnippet/>
        <CommentFrame/>
    </div>
  );
}

export default App;
