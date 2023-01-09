import { useLocation } from 'react-router-dom';
import Intro from '../components/home_page/Intro/Intro';
import Categories from '../components/home_page/categories/Categories';
import About from '../components/home_page/about-us/About';
import Forum from '../components/home_page/forum-quiz/Forum_Quiz';
import useLoginUser from '../hooks/use-LoginUser';

// const types_topics = [
//     {
//         type: 'SORTING',
//         topic_name: [
//             {'SELECTION SORT': path='/topics/Bubble_sort'},
//         ]
//     }
// ];
const typesTopics = [
  {
    type: 'SORTING',
    topicName: ['SELECTION SORT', 'QUICK SORT', 'BUBBLE SORT', 'RADIX SORT'],
    topicLink: [
      '/underconstruction',
      '/underconstruction',
      '/wiki/bubblesort',
      '/underconstruction',
    ],
  },
  {
    type: 'TREES',
    topicName: ['BINARY SEARCH STREES', 'TWO-TREE', 'THREE-TREE', 'RED-BLACK'],
    topicLink: [
      '/search/binarysearchtree',
      '/underconstruction',
      '/underconstruction',
      '/underconstruction',
    ],
  },
  {
    type: 'GRAPHS',
    topicName: [
      'BREADTH-FIRST SEARCH',
      'DEPTH FIRST SEARCH',
      'TOPOLOGICAL SORT',
      'DIJKSTRA GRAPH',
    ],
    topicLink: [
      '/search/bfs',
      '/underconstruction',
      '/underconstruction',
      '/underconstruction',
    ],
  },
  {
    type: 'Data Structures',
    topicName: ['ARRAY', 'LINKED LIST', 'STACK', 'QUEUE'],
    topicLink: [
      '/datastructures/arrays',
      '/underconstruction',
      '/underconstruction',
      '/underconstruction',
    ],
  },
];

// object
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
  const loc = useLocation();
  useLoginUser(loc);
  return (
    <>
      <Intro />
      <Categories typesTopics={typesTopics} />
      <About />
      <Forum />
    </>
  );
}
