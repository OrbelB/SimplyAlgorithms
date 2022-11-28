import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import image from "../../assets/nav-logo.png";
import Logout from "../logout/Logout";
import Bell from "./Bell";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import "./MainNavigation.css";

const nestedDropdownMenu = [
  {
    title: "Sorting",
    selections: ["Selection Sort", "Bubble Sort"],
    links: ["selection-sort", "/wiki/bubblesort"],
  },
  {
    title: "Trees",
    selections: ["Binary Search Trees", "Two Trees"],
    links: ["/search/binarysearchtree", "two-tree"],
  },
  {
    title: "Graphs",
    selections: ["DFS", "BFS"],
    links: ["dfs", "/search/bfs"],
  },
];
export default function MainNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profilePicture = useSelector((state) => state.user.profilePicture);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {showModal && <Logout handleLogout={handleLogout} />}
      <nav
        className="navbar navbar-expand-lg border-bottom border-dark"
        style={{ minHeight: "120px" }}
      >
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse mt-4  mt-md-0 mb-3 mb-md-0"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <DropdownMenu
                  dropdownTitle="Categories"
                  nestedDropdownSelections={nestedDropdownMenu}
                />
                <li className="nav-item">
                  <NavLink className="nav-link p-3" aria-current="page" to={"home"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link p-3" to={"dashboard"}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item me-auto">
                  <NavLink className="nav-link p-3" to={"forums"}>
                    Forums
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-nav flex-row d-none d-md-flex">
            <img className="nav-item me-lg-1 p-0" 
                  src={image}
                  height="60px"
                  width="auto"
                  alt="nav-logo"
                  loading="lazy"/>
          </div>
          <div className="navbar-nav flex-row">
            {/* <form className="nav-item me-2 d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="button">
                <span className="bi bi-search"></span>
              </button>
            </form> */}
            <div className="nav-item m-auto  me-3 me-lg-1" >
              <Bell />
            </div>
            <div className="nav-item m-auto dropdown  me-3 me-lg-1">
              <i
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="navbarDropdownMenuAvatar"
              >
                <img
                  src={profilePicture}
                  className="rounded-circle"
                  height="48"
                  alt="profile"
                  loading="lazy"
                />
              </i>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <NavLink className="dropdown-item" to={"userprofile"}>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"settings/profile"}>
                    Settings
                  </NavLink>
                </li>
                <li>
                  {isLoggedIn ? (
                    <i
                      type="button"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </i>
                  ) : (
                    <NavLink className="dropdown-item" to={"login"}>
                      {"login"}
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
