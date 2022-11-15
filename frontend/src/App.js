import { Routes, Route, Navigate } from "react-router-dom";
import TemplateTopicPage from "./pages/t_pages/TemplateTopicPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForumPage from "./pages/ForumPage";
import UserProfile from "./pages/UserProfilePage";
import ForumPost from "./components/forums/post_template/ForumPost";
import SecurityTab from "./components/settings/SecurityTab/SecurityTab";
import AccountTab from "./components/settings/AccountTab/AccountTab";
import NotificationTab from "./components/settings/NotificationTab/NotificationTab";
import SettingsPage from "./pages/SettingsPage";
import UnderConstructionPage from "./pages/UnderConstructionPage";
import MeetTeamPage from "./pages/MeetTeamPage";
import DashboardPage from "./pages/DashboardPage";
import Bubble_sort from "./pages/t_pages/Bubble_sort";
import Binary_search_tree from "./pages/t_pages/Binary_search_tree";
import Breadth_first_search from "./pages/t_pages/Breadth_first_search";
import Arrays from "./pages/t_pages/Arrays";
function App() {
<<<<<<< HEAD
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<TemplateTopicPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/forums" element={<ForumPage/>} />
                <Route path="/userprofile" element={<UserProfile/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/settings/profile" element={<SettingsPage/>}/>
                <Route path="/settings/account" element={<AccountTab/>}/>
                <Route path="/settings/security" element={<SecurityTab/>}/>
                <Route path="/settings/notifications" element={<NotificationTab/>}/>
                <Route path="/underconstruction" element={<UnderConstructionPage/>}/>
                <Route path="/team" element={<MeetTeamPage/>}/>
                <Route path={"/forums/:id"} element={<ForumPost/>}/>
                
                {/* SAMPLE TOPIC PAGES */}
                <Route path="/sort/bubblesort" element={<Bubble_sort/>}/>
                <Route path="/search/binarysearchtree" element={<Binary_search_tree/>}/>\
                <Route path="/search/bfs" element={<Breadth_first_search/>}/>
                <Route path="/datastructures/arrays" element={<Arrays/>}/>

                <Route path="*" element={<Navigate replace to={"/"}/>}/>
            </Routes>
        </Layout>
    );
=======
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TemplateTopicPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forums">
          <Route index element={<ForumPage />} />
          <Route path={":pageId"} element={<ForumPost />} />
        </Route>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings/profile" element={<SettingsPage />} />
        <Route path="/settings/account" element={<AccountTab />} />
        <Route path="/settings/security" element={<SecurityTab />} />
        <Route path="/settings/notifications" element={<NotificationTab />} />
        <Route path="/underconstruction" element={<UnderConstructionPage />} />
        <Route path="/topics/Bubble_sort" element={<Bubble_sort />} />
        <Route path="/team" element={<MeetTeamPage />} />
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </Layout>
  );
>>>>>>> 8952237ff02f6a3a9f934adcd316b9ae9efe6921
}

export default App;
