import {Navigate, NavLink} from "react-router-dom";
import {useState} from "react";
import Bell from "./Bell";
import DropdownMenu from "./dropdown-menu/DropdownMenu";

const nestedDropdownMenu = [
    {
        title: "Sorting",
        selections: ["Selection Sort", "Quick Sort"],
        links: ["selection-sort", "quick-sort"]

    },
    {
        title: "Trees",
        selections: ["Binary Trees", "Two Trees"],
        links: ["binary-tree", "two-tree"]
    },
    {
        title: "Graphs",
        selections: ["DFS", "BFS"],
        links: ["dfs", "bfs"]
    }

]
export default function MainNavigation() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <DropdownMenu dropdownTitle="Categories" nestedDropdownSelections={nestedDropdownMenu}/>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"home"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"dashboard"}>Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"forums"}>Forums</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary" type="submit"><span className="bi bi-search"></span>
                        </button>
                    </form>
                    <div className="nav-item ms-2">
                        <Bell/>
                    </div>
                    <div className="nav-item dropdown ms-3">
                        <a
                            className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="navbarDropdownMenuAvatar"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuAvatar"
                        >
                            <li>
                                <NavLink className="dropdown-item" to={"my-profile"}>My profile</NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"settings"}> Settings </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item" to={"logout"}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}