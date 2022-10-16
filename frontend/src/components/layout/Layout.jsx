import MainNavigation from "../main-navigation/MainNavigation";

export default function Layout(
    props

                               ) {
    return (
        <>
            <header>
            <MainNavigation/>
            </header>
            <main>
                {props.children}
            </main>
        </>

    )

}