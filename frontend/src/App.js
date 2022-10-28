import {Routes, Route, Navigate} from "react-router-dom";
import TemplateTopicPage from "./pages/t_pages/TemplateTopicPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForumPage from "./pages/ForumPage";
import ForumPost  from "./components/forums/post_template/ForumPost";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<TemplateTopicPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/forums" element={<ForumPage/>} />
                <Route path={"/forums/:id"} element={<ForumPost/>}/> 
                <Route path="*" element={<Navigate replace to={"/"}/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
