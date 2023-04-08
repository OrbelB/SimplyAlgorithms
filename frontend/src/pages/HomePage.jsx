import { useLocation } from 'react-router-dom';
import Intro from '../components/home_page/Intro/Intro';
import Categories from '../components/home_page/categories/Categories';
import About from '../components/home_page/about-us/About';
import Forum from '../components/home_page/forum-quiz/Forum_Quiz';
import useLoginUser from '../hooks/use-loginuser';

export default function HomePage() {
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname ?? '/home';
  useLoginUser(redirectTo);
  return (
    <>
      <Intro />
      <Categories />
      <About />
      <Forum />
    </>
  );
}
