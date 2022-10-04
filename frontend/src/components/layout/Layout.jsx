import MainNavigation from "../ui/main-navigation/MainNavigation";

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