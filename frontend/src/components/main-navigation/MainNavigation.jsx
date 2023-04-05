import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const pages = [
  { name: 'Home', path: 'home' },
  { name: 'Dashboard', path: 'dashboard' },
  { name: 'Forums', path: 'forums' },
  { name: 'Quizzes', path: 'quiz' },
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
  const { wikiLinks } = useSelector((state) => state.wiki);
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
        <AppBar
          position="sticky"
          color="default"
          component="header"
          sx={{ zIndex: 1054 }}
        >
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
                  nestedDropdownSelections={wikiLinks}
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
              {isLoggedIn && (
                <Box component="div" className="me-2">
                  <Bell />
                </Box>
              )}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Setting">
                  <IconButton onClick={handleOpenUserMenu}>
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
                  {isLoggedIn && (
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
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
