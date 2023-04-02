/* eslint-disable react/jsx-filename-extension */
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NotificationTab from './components/settings/NotificationTab/NotificationTab';
import RequireAuth from './components/authentication/RequireAuth';
import BinarySearchTree from './pages/t_pages/BinarySearchTree';
import BreadtFirstSearch from './pages/t_pages/BreadtFirstSearch';
import Arrays from './pages/t_pages/Arrays';
import ScrollToTop from './hooks/ScrollToTop';
import useRefreshToken from './hooks/use-refreshToken';
import Layout from './components/layout/Layout';
import { wikiActions } from './store/reducers/wiki-slice';
import LoadingBackdrop from './components/loading/LoadingBackdrop';

const AccountTab = lazy(() =>
  import('./components/settings/AccountTab/AccountTab')
);
const SecurityTab = lazy(() =>
  import('./components/settings/SecurityTab/SecurityTab')
);
const UserProfile = lazy(() => import('./pages/UserProfilePage'));
const ForumPage = lazy(() => import('./pages/ForumPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const WikiPage = lazy(() => import('./pages/WikiPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CreateWiki = lazy(() => import('./pages/CreateWiki'));
const QuizSample = lazy(() => import('./pages/q_pages/QuizSample'));
const PasswordResetPage = lazy(() =>
  import('./components/login/PasswordResetPage')
);
const CreateTopicPage = lazy(() => import('./pages/CreateTopicPage'));
const CreateQuiz = lazy(() =>
  import('./components/quiz/QuizCreationUpdate/CreateUpdateQuiz')
);
const QuizPage = lazy(() => import('./pages/QuizHomePage'));
const MeetTeamPage = lazy(() => import('./pages/MeetTeamPage'));
const UnderConstructionPage = lazy(() =>
  import('./pages/UnderConstructionPage')
);
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const ForumEdit = lazy(() =>
  import('./components/forums/post_template/ForumEdit')
);
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ForumPost = lazy(() =>
  import('./components/forums/post_template/ForumPost')
);

function App() {
  useRefreshToken();

  return (
    <Layout>
      <Suspense fallback={<LoadingBackdrop />}>
        <ScrollToTop />
        <Routes>
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
            <Route path=":wikiName/:topicName" element={<TopicPage />} />
          </Route>
          <Route path="/team" element={<MeetTeamPage />} />
          <Route path="/topic">
            <Route path="new/create" element={<CreateTopicPage />} />
            <Route path=":topicName/edit" element={<CreateTopicPage />} />
            <Route path=":topicName" element={<TopicPage />} />
          </Route>
          <Route
            path="/underconstruction"
            element={<UnderConstructionPage />}
          />
          <Route
            path="*"
            element={<Navigate replace to="/underconstruction" />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
