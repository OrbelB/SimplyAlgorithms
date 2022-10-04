import {Routes, Route} from "react-router-dom";
import TemplateTopicPage from "./pages/t_pages/TemplateTopicPage";
import Layout from "./components/layout/Layout";


function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<TemplateTopicPage/>}/>
                <Route path="*" element={<TemplateTopicPage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
