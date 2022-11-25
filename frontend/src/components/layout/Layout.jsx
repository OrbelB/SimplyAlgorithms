import MainNavigation from "../main-navigation/MainNavigation";
import Footer from "../Footer/Footer";

export default function Layout(props) {
  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main className="">{props.children}</main>
      <Footer />
    </>
  );
}
