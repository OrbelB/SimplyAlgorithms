import Intro from "../components/home_page/Intro/Intro";
import Categories from "../components/home_page/categories/Categories";
import About from "../components/home_page/about-us/About";
import Forum from "../components/home_page/forum-quiz/Forum_Quiz";

const types_topics = [
    {
        type: 'SORTING',
        topic_name: ['SELECTION SORT', 'QUICK SORT', 'BUBBLE SORT', 'RADIX SORT']
    },
    {
        type: 'TREES',
        topic_name: ['BINARY TREES', 'TWO-TREE', 'THREE-TREE', 'RED-BLACK']
    },
    {
        type: 'GRAPHS',
        topic_name: ['BREADTH-FIRST SEARCH', 'DEPTH FIRST SEARCH', 'TOPOLOGICAL SORT', 'DIJKSTRA GRAPH']
    },
    {
        type: 'Data Structures',
        topic_name: ['ARRAY', 'LINKED LIST', 'STACK', 'QUEUE']
    }

];
export default function HomePage() {
    console.log(types_topics);
    return (
        <>
            <Intro/>
            <Categories types_topics={types_topics}/>
            <About/>
            <Forum/>
        </>
    );
}