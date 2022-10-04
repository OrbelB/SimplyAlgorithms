import MainNavigation from "../main-navigation/MainNavigation";

export default function Layout(
    props

                               ) {
    return (
        <>
            <MainNavigation/>
            <main>
                {props.children}
            </main>
        </>

    )

}