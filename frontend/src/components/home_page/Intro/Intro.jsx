import "./Intro.css"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Intro() {
    const isLoggedIn  = useSelector(state => state.auth);
    return (
        <div className="section">
            <div className="container-fluid pb-5">
                <h1 className="row justify-content-center title m-1 m-sm-auto">
                    SIMPLY ALGORITHMS
                </h1>
                <p className="row justify-content-center slogan m-1 m-md-auto">
                    algorithms made easy
                </p>
               {isLoggedIn && <div className="row justify-content-center m-1 m-md-auto">
                    <NavLink to={"/login"}>
                        <button className="button w-auto">SIGN UP</button>
                    </NavLink>
                </div>}
            </div>
        </div>
    )

}