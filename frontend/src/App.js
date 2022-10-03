import Detail from './components/ui/Detail'
import AlgoFrame from './components/ui/algo-frame/AlgoFrame'
import CodeSnippet from './components/ui/CodeSnippet'
import MainNavigation from "./components/ui/main-navigation/MainNavigation";
import Alg_vis_btns from './components/ui/alg_vis_btns/Alg_vis_btns'
import InputComment from "./components/ui/comment/InputComment";
import Comment from "./components/ui/comment/Comment";

function App() {
  return (
    <div className="App">
        <MainNavigation/>
        <AlgoFrame/>
        <Alg_vis_btns/>
        <Detail />
        <CodeSnippet/>
        <InputComment/>
        <Comment/>
    </div>
  );
}

export default App;
