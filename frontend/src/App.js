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
import WikiPage from './pages/WikiPage';
import BubbleSort from './pages/t_pages/BubbleSort';
import ForumEdit from './components/forums/post_template/ForumEdit';
import RequireAuth from './components/authentication/RequireAuth';
import BinarySearchTree from './pages/t_pages/BinarySearchTree';
import BreadtFirstSearch from './pages/t_pages/BreadtFirstSearch';
import Arrays from './pages/t_pages/Arrays';
import Sorting from './components/wiki/topics/Sorting';
import ScrollToTop from './components/ScrollToTop';
import useRefreshToken from './hooks/use-refreshToken';

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
        <Route path="/forums">
          <Route index element={<ForumPage />} />
          <Route path=":pageId" element={<ForumPost />} />
          <Route path="edit/:pageId" element={<ForumEdit />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<DashboardPage />} />

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
        <Route path="/wiki/bubblesort" element={<BubbleSort />} />
        <Route path="/search/binarysearchtree" element={<BinarySearchTree />} />
        <Route path="/search/bfs" element={<BreadtFirstSearch />} />
        <Route path="/datastructures/arrays" element={<Arrays />} />
        <Route path="/wikihome" element={<WikiPage />} />
        <Route path="/wiki/sorting" element={<Sorting />} />

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
