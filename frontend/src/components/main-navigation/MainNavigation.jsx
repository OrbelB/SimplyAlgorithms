import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "../logout/Logout";
import Bell from "./Bell";
import DropdownMenu from "./dropdown-menu/DropdownMenu";

const nestedDropdownMenu = [
  {
    title: "Sorting",
    selections: ["Selection Sort", "Quick Sort"],
    links: ["selection-sort", "quick-sort"],
  },
  {
    title: "Trees",
    selections: ["Binary Trees", "Two Trees"],
    links: ["binary-tree", "two-tree"],
  },
  {
    title: "Graphs",
    selections: ["DFS", "BFS"],
    links: ["dfs", "bfs"],
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
    {showModal && <Logout handleLogout={handleLogout}/>}
      <nav className="navbar navbar-expand-lg bg-light border-bottom border-dark">
        <div className="container-fluid">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <DropdownMenu
                dropdownTitle="Categories"
                nestedDropdownSelections={nestedDropdownMenu}
              />
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"home"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"dashboard"}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"forums"}>
                  Forums
                </NavLink>
              </li>
            </ul>
            <form className="d-flex me-4" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                <span className="bi bi-search"></span>
              </button>
            </form>
          </div>
          <div className="nav-item ms-auto me-4">
            <Bell />
          </div>
          <div className="nav-item dropdown me-2">
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
                height="25"
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
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to={"settings/profile"}>
                  Settings
                </NavLink>
              </li>
              <li>
                {isLoggedIn ? (
                  <i type="button" className="dropdown-item" onClick={handleLogout}>
                    logout
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
      </nav>
    </>
  );
}
