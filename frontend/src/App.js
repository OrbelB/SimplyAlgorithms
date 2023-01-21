/* eslint-disable react/jsx-filename-extension */
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForumPage from './pages/ForumPage';
import UserProfile from './pages/UserProfilePage';
import ForumPost from './components/forums/post_template/ForumPost';
import SecurityTab from './components/settings/SecurityTab/SecurityTab';
import AccountTab from './components/settings/AccountTab/AccountTab';
import NotificationTab from './components/settings/NotificationTab/NotificationTab';
import SettingsPage from './pages/SettingsPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import MeetTeamPage from './pages/MeetTeamPage';
import DashboardPage from './pages/DashboardPage';
import ForumEdit from './components/forums/post_template/ForumEdit';
import RequireAuth from './components/authentication/RequireAuth';
import BinarySearchTree from './pages/t_pages/BinarySearchTree';
import BreadtFirstSearch from './pages/t_pages/BreadtFirstSearch';
import Arrays from './pages/t_pages/Arrays';
import WikiPage from './pages/WikiPage';
import WSorting from './components/wiki/topics/WSorting';
import WSelectionSort from './components/wiki/topics/WSelectionSort';
import WQuickSort from './components/wiki/topics/WQuickSort';
import WBubbleSort from './components/wiki/topics/WBubbleSort';
import WRadixSort from './components/wiki/topics/WRadixSort';
import WTrees from './components/wiki/topics/WTrees';
import WBinarySearch from './components/wiki/topics/WBinarySearch';
import WTwoTree from './components/wiki/topics/WTwoTree';
import WThreeTree from './components/wiki/topics/WThreeTree';
import WRedBlack from './components/wiki/topics/WRedBlack';
import WGraphs from './components/wiki/topics/WGraphs';
import WBreadthFirst from './components/wiki/topics/WBreadthFirst';
import WDepthFirst from './components/wiki/topics/WDepthFirst';
import WTopologicalSort from './components/wiki/topics/WTopologicalSort';
import WDjikstra from './components/wiki/topics/WDjikstra';
import WDataStructures from './components/wiki/topics/WDataStructures';
import WArray from './components/wiki/topics/WArray';
import WLinkedList from './components/wiki/topics/WLinkedList';
import WStack from './components/wiki/topics/WStack';
import WQueue from './components/wiki/topics/WQueue';
import ScrollToTop from './components/ScrollToTop';
import useRefreshToken from './hooks/use-refreshToken';
import PasswordResetPage from './components/login/PasswordResetPage';

function App() {
  useRefreshToken();

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        {/* <ScrollToTop/> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="passwordReset/:passwordResetToken"
          element={<PasswordResetPage />}
        />
        <Route path="/forums">
          <Route index element={<ForumPage />} />
          <Route path=":pageId" element={<ForumPost />} />
          <Route path="edit/:pageId" element={<ForumEdit />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/settings">
            <Route path="profile" element={<SettingsPage />} />
            <Route path="account" element={<AccountTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="notifications" element={<NotificationTab />} />
          </Route>
        </Route>
        <Route path="/underconstruction" element={<UnderConstructionPage />} />
        {/* SAMPLE TOPIC PAGES */}
        <Route path="/search/binarysearchtree" element={<BinarySearchTree />} />
        <Route path="/search/bfs" element={<BreadtFirstSearch />} />
        <Route path="/arrays" element={<Arrays />} />
        {/* WIKI PAGES */}
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="/sorting" element={<WSorting />} />
        <Route path="/sorting/selectionsort" element={<WSelectionSort />} />
        <Route path="/sorting/quicksort" element={<WQuickSort />} />
        <Route path="/sorting/bubblesort" element={<WBubbleSort />} />
        <Route path="/sorting/radixsort" element={<WRadixSort />} />
        <Route path="/trees" element={<WTrees />} />
        <Route path="/trees/binarysearch" element={<WBinarySearch />} />
        <Route path="/trees/twotree" element={<WTwoTree />} />
        <Route path="/trees/threetree" element={<WThreeTree />} />
        <Route path="/trees/redblacktree" element={<WRedBlack />} />
        <Route path="/graphs" element={<WGraphs />} />
        <Route path="/graphs/breadthfirst" element={<WBreadthFirst />} />
        <Route path="/graphs/depthfirst" element={<WDepthFirst />} />
        <Route path="/graphs/topological" element={<WTopologicalSort />} />
        <Route path="/graphs/djikstra" element={<WDjikstra />} />
        <Route path="/datastructures" element={<WDataStructures />} />
        <Route path="/datastructures/arrays" element={<WArray />} />
        <Route path="/datastructures/linkedlist" element={<WLinkedList />} />
        <Route path="/datastructures/stack" element={<WStack />} />
        <Route path="/datastructures/queue" element={<WQueue />} />

        <Route path="/team" element={<MeetTeamPage />} />
        <Route
          path="*"
          element={<Navigate replace to="/underconstruction" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
