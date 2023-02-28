import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Box,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Menu,
  Divider,
} from '@mui/material';
import image from '../../assets/nav-logo.png';
import Logout from '../logout/Logout';
import Notebook from '../notebook/Notebook';
import Bell from './Bell';
import DropdownMenu from './dropdown-menu/DropdownMenu';
import './MainNavigation.css';

const nestedDropdownMenu = [
  {
    title: 'Sorting',
    selections: ['Selection Sort', 'Bubble Sort'],
    links: ['selection-sort', '/wiki/bubblesort'],
  },
  {
    title: 'Trees',
    selections: ['Binary Search Trees', 'Two Trees'],
    links: ['/search/binarysearchtree', 'two-tree'],
  },
  {
    title: 'Graphs',
    selections: ['DFS', 'BFS'],
    links: ['dfs', '/search/bfs'],
  },
];

const pages = [
  { name: 'Home', path: 'home' },
  { name: 'Dashboard', path: 'dashboard' },
  { name: 'Forums', path: 'forums' },
];

function useAnchoEl() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return {
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    setAnchorEl,
  };
}

export default function MainNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profilePicture = useSelector((state) => state.user.profilePicture);
  const navigate = useNavigate();
  const {
    handleOpenMenu: handleOpenNavMenu,
    handleCloseMenu: handleCloseNavMenu,
    anchorEl: anchorElNav,
  } = useAnchoEl();

  const {
    handleOpenMenu: handleOpenUserMenu,
    handleCloseMenu: handleCloseUserMenu,
    anchorEl: anchorElUser,
  } = useAnchoEl();
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModalReady, setShowModalReady] = useState(false);

  useEffect(() => {
    if (!anchorElUser && showModalReady) {
      setShowModal(!showModal);
      setShowModalReady(false);
    }
  }, [
    anchorElUser,
    showModalReady,
    setShowModal,
    setShowModalReady,
    showModal,
  ]);

  const handleLogout = () => {
    setShowModalReady(true);
  };

  const showNew = false;
  return (
    <>
      {showModal && !anchorElUser && <Logout handleLogout={handleLogout} />}
      {!showNew && (
        <AppBar position="static" color="default" component="nav">
          <Container maxWidth="xxl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu sm screen"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <i className="bi bi-list" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map(({ name, path }) => (
                    <MenuItem
                      key={name}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(`/${path}`);
                      }}
                    >
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                component="img"
                sx={{
                  display: { sm: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  height: 40,
                  width: 200,
                  maxHeight: { xs: 60, md: 60 },
                  maxWidth: { xs: 'auto', md: 250 },
                }}
                loading="lazy"
                alt="logo"
                src={image}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'none', md: 'flex' },
                }}
              >
                <DropdownMenu
                  dropdownTitle="Categories"
                  nestedDropdownSelections={nestedDropdownMenu}
                />
                {pages.map(({ name, path }) => (
                  <Button
                    key={name}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/${path}`);
                    }}
                    sx={{
                      p: 2,
                      color: 'black',
                      display: 'block',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: 20,
                      textTransform: 'none',
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
              <Box component="div" sx={{ flexGrow: 2 }}>
                <Box
                  component="img"
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    color: 'inherit',

                    textDecoration: 'none',
                    height: 45,
                    width: 'auto',
                    maxHeight: { xs: 60, md: 50 },
                    maxWidth: { xs: 350, md: 'auto' },
                  }}
                  loading="lazy"
                  alt="logo"
                  src={image}
                />
              </Box>
              <Box component="div" className="me-3">
                <Bell />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Setting">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ width: 45, height: 45 }}
                      alt="current profile"
                      src={profilePicture}
                      loading="lazy"
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`userprofile`);
                    }}
                  >
                    <Typography textAlign="center">My Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`settings/profile`);
                    }}
                  >
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                  {isLoggedIn ? (
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate(`login`);
                      }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      if (!isDrawerOpen) {
                        setIsDrawerOpen(true);
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Notebook</Typography>
                    <Notebook
                      isDrawerOpen={isDrawerOpen}
                      setIsDrawerOpen={setIsDrawerOpen}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {showNew && (
        <nav
          className="navbar navbar-expand-lg border-bottom border-dark"
          style={{ minHeight: '120px' }}
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
                <span className="navbar-toggler-icon" />
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
                    <NavLink
                      className="nav-link p-3"
                      aria-current="page"
                      to="home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link p-3" to="dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item me-auto">
                    <NavLink className="nav-link p-3" to="forums">
                      Forums
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-nav flex-row d-none d-xl-flex">
              <img
                className="ime nav-item me-lg-1 p-0"
                src={image}
                height="60px"
                width="auto"
                alt="nav-logo"
                loading="lazy"
              />
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
              <div className="nav-item m-auto  me-3 me-lg-1">
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
                    height="45"
                    width="45"
                    alt="profile"
                    loading="lazy"
                  />
                </i>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <NavLink className="dropdown-item" to="userprofile">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="settings/profile">
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    {isLoggedIn ? (
                      <i
                        type="button"
                        className="dropdown-item"
                        onClick={handleLogout}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'enter') {
                            handleLogout();
                          }
                        }}
                        role="button"
                      >
                        Logout
                      </i>
                    ) : (
                      <NavLink className="dropdown-item" to="login">
                        Login
                      </NavLink>
                    )}
                  </li>
                  <div className="dropdown-divider"> </div>
                  <li>
                    <Notebook />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
