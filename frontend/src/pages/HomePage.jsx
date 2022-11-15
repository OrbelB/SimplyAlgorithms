import Intro from "../components/home_page/Intro/Intro";
import Categories from "../components/home_page/categories/Categories";
import About from "../components/home_page/about-us/About";
import Forum from "../components/home_page/forum-quiz/Forum_Quiz";


// const types_topics = [
//     {
//         type: 'SORTING',
//         topic_name: [
//             {'SELECTION SORT': path='/topics/Bubble_sort'},
//         ]
//     }
// ];
const types_topics = [
    {
        type: 'SORTING',
        topic_name: ['SELECTION SORT', 'QUICK SORT', 'BUBBLE SORT', 'RADIX SORT'],
        topic_link: ['/underconstruction', '/underconstruction', '/sort/bubblesort' ,'/underconstruction']
    },
    {
        type: 'DATA STRUCTURES',
        topic_name: ['BINARY SEARCH STREES', 'TWO-TREE', 'THREE-TREE', 'RED-BLACK'],
        topic_link: ['/search/binarysearchtree','/underconstruction','/underconstruction','/underconstruction']
    },
    {
        type: 'GRAPHS',
        topic_name: ['BREADTH-FIRST SEARCH', 'DEPTH FIRST SEARCH', 'TOPOLOGICAL SORT', 'DIJKSTRA GRAPH'],
        topic_link: ['/search/bfs','/underconstruction','/underconstruction','/underconstruction']
    },
    {
        type: 'Data Structures',
        topic_name: ['ARRAY', 'LINKED LIST', 'STACK', 'QUEUE'],
        topic_link: ['/datastructures/arrays','/underconstruction','/underconstruction','/underconstruction', ]
    }
];

//object
// const forum_post = {
//     user:   "Mack",
//     title:  "First Post",
//     text:   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, culpa tempora, obcaecati dignissimos aliquam voluptatum architecto excepturi mollitia ea quam velit, ducimus inventore repellendus vero placeat! Cumque ex nam illum!",
//     like:   50,
//     dislike:10,
//     posted: "2 months ago",
//     tags:   "#temp",
//     photo:  "add later",
//     video:  "add later",

//     LD_ratio: function() {
//         return ((this.like-this.dislike) / (this.like+this.dislike)) * 100;
//     }
// };
export default function HomePage() {
  return (
    <>
      <Intro />
      <Categories types_topics={types_topics} />
      <About />
      <Forum />
    </>
  );
}
