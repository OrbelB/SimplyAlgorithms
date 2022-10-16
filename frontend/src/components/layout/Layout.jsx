import MainNavigation from "../main-navigation/MainNavigation";
import Footer from "../Footer/Footer";

export default function Layout(
    props

                               ) {
    return (
        <>
            <MainNavigation/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>

    )

}