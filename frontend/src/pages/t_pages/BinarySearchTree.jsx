import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';
import NavbarTopic from '../../components/navbarFortopic/NavbarTopic';
import AlgoFram from '../../components/algo-frame/AlgoFrame';
// import AlgVisBtns from  "../../components/topic_page_samples/binary_search_tree/alg_vis_btns/AlgVisBtns"
import Detail from '../../components/topic_page_samples/binary_search_tree/detail/Detail';
import CodeSnippet from '../../components/topic_page_samples/binary_search_tree/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page_samples/binary_search_tree/topic_quiz/TopicQuiz"
import CommentFrame from '../../components/comment/CommentFrame';
import { fetchSingleTopic } from '../../services/topic';
import { forumActions } from '../../store/reducers/forum-reducer';
import { listVotesByPage } from '../../services/comment';
import { commentActions } from '../../store/reducers/comment-reducer';
import { commentVoteActions } from '../../store/reducers/comment-vote-reducer';
import Vote from '../../components/vote_comp/Vote';
import ForumPreview from '../../components/forums-preview/ForumPreview';

const bst =
  'https://algorithm-visualizer.org/branch-and-bound/binary-search-tree';
const VIZ_TITLE = 'BINARY SEARCH TREE';
const BINARY_SEARCH_PAGE_ID = '7940b97e-d662-4c19-a2bc-2cd74f3fe25c';

export default function BinarySearchTree() {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    jwtAccessToken,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const { status, forum } = useSelector((state) => state.forum);
  const { status: commentVoteStatus } = useSelector(
    (state) => state.commentVotes
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleTopic(BINARY_SEARCH_PAGE_ID));
    }
    if (status === 'success') {
      dispatch(commentVoteActions.resetData());
      dispatch(commentActions.resetData());
      dispatch(forumActions.resetData());
    }
    if (status === 'completed') {
      dispatch(commentActions.resetData());
      dispatch(commentVoteActions.resetData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (
      commentVoteStatus === 'idle' &&
      jwtAccessToken !== '' &&
      isLoggedIn &&
      authUserId !== '' &&
      BINARY_SEARCH_PAGE_ID !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId: BINARY_SEARCH_PAGE_ID,
          userId: authUserId,
        })
      );
    }
  }, [authUserId, dispatch, isLoggedIn, jwtAccessToken, commentVoteStatus]);

  const [open, setOpen] = useState(false);
  const trigger = useScrollTrigger({
    target: window,
    threshold: 50,
  });

  useEffect(() => {
    if (!trigger) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  }, [trigger]);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <section id="visualizer">
        {VIZ_TITLE && <AlgoFram vis_url={bst} viz_title={VIZ_TITLE} />}
      </section>
      <Slide
        direction="up"
        className="position-fixed m-2 bottom-0 start-0"
        in={open}
      >
        <div>
          <Vote like_={0} dislike_={0} />
        </div>
      </Slide>

      <Slide
        direction="up"
        className="position-fixed m-4 d-none d-lg-flex"
        style={{
          bottom: '0',
          left: '40%',
          transform: 'translateX(-50%)',
          margin: '0 auto',
        }}
        in={open}
      >
        <div>
          <NavbarTopic />
        </div>
      </Slide>

      <section id="content">
        <Detail>
          <>
            <div className="top p-5">
              <h2>SEARCH STEPS</h2>
              <p className="lh-lg">
                1. Start from the root.
                <br />
                2. Compare the searching element with root, if less than root,
                then recursively call left subtree, else recursively call right
                subtree.
                <br />
                3. If the element to search is found anywhere, return true, else
                return false.
              </p>
              <br />
              <h2>INSERTION STEPS</h2>
              <div className="size text-center">
                <p className="lh-lg">
                  1. Start from the root.
                  <br />
                  2. Compare the inserting element with root, if less than root,
                  then recursively call left subtree, else recursively call
                  right subtree.
                  <br />
                  3. After reaching the end, just insert that node at left(if
                  less than current) or else right.
                </p>
              </div>
              <br />
              <h2>DELETION STEPS:</h2>
              <div className="size text-center">
                <p className="lh-lg">
                  1. Node to be deleted is the leaf: Simply remove from the
                  tree.
                  <br />
                  2. Node to be deleted has only one child: Copy the child to
                  the node and delete the child
                  <br />
                  3. Node to be deleted has two children: Find inorder successor
                  of the node. Copy contents of the inorder successor to the
                  node and delete the inorder successor. Note that inorder
                  predecessor can also be used.
                </p>
              </div>
              <br />
              <b className="size">
                The important thing to note is, inorder successor is needed only
                when the right child is not empty. In this particular case,
                inorder successor can be obtained by finding the minimum value
                in the right child of the node.
              </b>
            </div>
            <div className="mid ">
              <h2 className="mb-4">HOW DOES THE ALGORITHM WORKS?</h2>
              <p className="size text-start">
                A binary Search Tree is a node-based binary tree data structure
                which has the following properties: <br />
                1) The left subtree of a node contains only nodes with keys
                lesser than the node’s key. <br />
                2) The right subtree of a node contains only nodes with keys
                greater than the node’s key. <br />
                3) The left and right subtree each must also be a binary search
                tree. <br />
                4) There must be no duplicate nodes. <br /> <br />
                <h4 className="mb-0">
                  <b>How to search a key in given Binary Tree?</b>{' '}
                </h4>
                <br />
                For searching a value, if we had a sorted array we could have
                performed a binary search. Let’s say we want to search a number
                in the array, in binary search, we first define the complete
                list as our search space, the number can exist only within the
                search space. Now we compare the number to be searched or the
                element to be searched with the middle element (median) of the
                search space and if the record being searched is less than the
                middle element, we go searching in the left half, else we go
                searching in the right half, in case of equality we have found
                the element. In binary search, we start with ‘n’ elements in
                search space and if the mid element is not the element that we
                are looking for, we reduce the search space to ‘n/2’ we keep
                reducing the search space until we either find the record that
                we are looking for or we get to only one element in search space
                and be done with this whole reduction.
                <br />
                <br />
                A new key is always inserted at the leaf. We start searching for
                a key from the root until we hit a leaf node. Once a leaf node
                is found, the new node is added as a child of the leaf node.
                <br />
                <br />
                When we delete a node, three possibilities arise.
              </p>
            </div>
            <div className="container-fluid bot">
              <div className="row justify-content-center mb-4">
                <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
              </div>
              <div className="row justify-content-center text-start">
                <h4>Searching:</h4>
                <p className="size text-start align-self-center">
                  For searching element 1, we have to traverse all elements (in
                  order 3, 2, 1). Therefore, searching in binary search tree has
                  worst case complexity of O(n). In general, time complexity is
                  O(h) where h is height of BST.
                </p>
                <h4>Insertion:</h4>
                <p className="size text-start align-self-center">
                  For inserting element 0, it must be inserted as left child of
                  1. Therefore, we need to traverse all elements (in order 3, 2,
                  1) to insert 0 which has worst case complexity of O(n). In
                  general, time complexity is O(h).
                </p>
                <h4>Deletion:</h4>
                <p className="size text-start align-self-center">
                  For deletion of element 1, we have to traverse all elements to
                  find 1 (in order 3, 2, 1). Therefore, deletion in binary tree
                  has worst case complexity of O(n). In general, time complexity
                  is O(h).
                </p>
              </div>
              <div className="row justify-content-around  mt-auto mt-sm-5   p-2">
                <div className="col-auto col-sm-auto align-self-center">
                  <h2 className="m-3 mb-4">FURTHER REFERENCES</h2>
                  <ul className="size">
                    <li>
                      <a
                        href="https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        geeksforgeeks - Binary Search Tree | Set 1 (Search and
                        Insertion) (data structure)
                      </a>
                    </li>
                    -
                    <li>
                      <a
                        href="https://www.geeksforgeeks.org/deletion-in-binary-search-tree/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        geeksforgeeks - Deletion in Binary Search Tree
                      </a>
                    </li>
                    -
                    <li>
                      <a
                        href="https://en.wikipedia.org/wiki/Binary_tree"
                        target="_blank"
                        rel="noreferrer"
                      >
                        wikipedia - Binary tree
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-auto  text-center vid">
                  <iframe
                    className="rounded-4 "
                    width="auto"
                    height="auto"
                    src="https://www.youtube.com/embed/jDM6_TnYIqE"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </>
        </Detail>
      </section>
      <section id="code">
        <CodeSnippet />
      </section>
      {/* <TopicQuiz/> */}
      <section id="forumspreview">
        <ForumPreview />
      </section>
      <section id="comments">
        {status === 'completed' && forum && (
          <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
        )}
      </section>
    </>
  );
}
