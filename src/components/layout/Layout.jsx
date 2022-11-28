import MainNavigation from "../main-navigation/MainNavigation";
import Footer from "../Footer/Footer";
export default function Layout(props) {
  return (
    <>
      <header style={{minHeight:"50px"}}>
        <MainNavigation />
      </header>
      <main style={{flex:1}}>{props.children}</main>
      <Footer />
    </>
  );
}
