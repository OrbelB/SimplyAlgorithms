/* eslint-disable react/jsx-filename-extension */
import { Routes, Route, Navigate } from 'react-router-dom';
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
// import WSorting from './components/wiki/WSorting';
// import WTrees from './components/wiki/WTrees';
// import WGraphs from './components/wiki/WGraphs';
// import WDataStructures from './components/wiki/WDataStructures';
import ScrollToTop from './components/ScrollToTop';
import useRefreshToken from './hooks/use-refreshToken';
import PasswordResetPage from './components/login/PasswordResetPage';
import QuizPage from './pages/QuizHomePage';
import QuizSample from './pages/q_pages/QuizSample';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CreateTopicPage from './pages/CreateTopicPage';
import CreateQuiz from './components/quiz/QuizCreationUpdate/CreateUpdateQuiz';
import CreateWiki from './pages/CreateWiki';
import { wikiActions } from './store/reducers/wiki-reducer';
// import UpdateQuiz from './components/quiz/QuizCreationUpdate/UpdateQuiz';

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
        <Route path="passwordReset" element={<PasswordResetPage />} />
        <Route path="/forums">
          <Route index element={<ForumPage />} />
          <Route path=":pageId" element={<ForumPost />} />
          <Route path="edit/:pageId" element={<ForumEdit />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings">
            <Route path="profile" element={<SettingsPage />} />
            <Route path="account" element={<AccountTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="notifications" element={<NotificationTab />} />
          </Route>
          <Route path="/quiz">
            <Route index element={<QuizPage />} />
            <Route path=":quizId/edit" element={<CreateQuiz />} />
            <Route path=":quizId" element={<QuizSample />} />
            <Route path="CreateQuiz" element={<CreateQuiz />} />
          </Route>
        </Route>
        {/* SAMPLE TOPIC PAGES */}

        <Route path="/search">
          <Route path="binarysearchtree" element={<BinarySearchTree />} />
          <Route path="bfs" element={<BreadtFirstSearch />} />
        </Route>
        <Route path="/arrays" element={<Arrays />} />

        {/* WIKI PAGES */}
        <Route path="/wiki" action={() => wikiActions.resetData()}>
          <Route index element={<Navigate replace to="Main Category" />} />
          <Route path=":wikiName" element={<WikiPage />} />
          <Route path="new/create" element={<CreateWiki />} />
          <Route path=":wikiName/edit" element={<CreateWiki />} />
        </Route>
        {/* <Route path="/sorting" element={<WSorting />} />
        <Route path="/trees" element={<WTrees />} />
        <Route path="/graphs" element={<WGraphs />} />
      <Route path="/datastructures" element={<WDataStructures />} /> */}

        {/* <Route path="/quiz/UpdateQuiz" element={<UpdateQuiz />} /> */}

        <Route path="/team" element={<MeetTeamPage />} />
        <Route path="/createtopic" element={<CreateTopicPage />} />
        <Route path="/underconstruction" element={<UnderConstructionPage />} />
        <Route
          path="*"
          element={<Navigate replace to="/underconstruction" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
