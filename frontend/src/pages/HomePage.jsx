import Intro from "../components/home_page/Intro/Intro";
import Categories from "../components/home_page/categories/Categories";
import About from "../components/home_page/about-us/About";
import Forum from "../components/home_page/forum-quiz/Forum_Quiz";

export default function HomePage() {
    return (
        <>
           <Intro/>
           <Categories/>
           <About/>
           <Forum/>
        </>
    );
}