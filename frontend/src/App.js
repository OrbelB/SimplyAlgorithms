import {Routes, Route, Navigate} from "react-router-dom";
import TemplateTopicPage from "./pages/t_pages/TemplateTopicPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForumPage from "./pages/ForumPage";
import UserProfile from "./pages/UserProfilePage";
import ForumPost  from "./components/forums/post_template/ForumPost";
import SecurityTab from "./components/settings/SecurityTab/SecurityTab";
import AccountTab from "./components/settings/AccountTab/AccountTab";
import NotificationTab from "./components/settings/NotificationTab/NotificationTab";
import SettingsPage from "./pages/SettingsPage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<TemplateTopicPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/forums" element={<ForumPage/>} />
                <Route path="/userprofile" element={<UserProfile/>}/>
                <Route path="/settings/profile" element={<SettingsPage/>}/>
                <Route path="/settings/account" element={<AccountTab/>}/>
                <Route path="/settings/security" element={<SecurityTab/>}/>
                <Route path="/settings/notifications" element={<NotificationTab/>}/>
                <Route path={"/forums/:id"} element={<ForumPost/>}/> 
                <Route path="*" element={<Navigate replace to={"/"}/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
