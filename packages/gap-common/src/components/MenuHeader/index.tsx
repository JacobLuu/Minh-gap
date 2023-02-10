import React, { useState, useLayoutEffect, MouseEvent } from 'react';
import {
  Box,
  Toolbar,
  MenuItem,
  Avatar,
  Divider,
  Badge,
  Menu,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import history from '../../utils/history';
import { removeCachedUrl } from '../../utils/localStorage';
import { ACCESS_TOKEN } from '../../constants/localStorage';
import { MenuBar, UserName } from './styles';

const MenuHeader = ({ handleDrawerToggle, handleDrawerToggleMobile }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuDraw, setMenuDraw] = useState(true);
  const open = Boolean(anchorEl);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    removeCachedUrl();
    history.replace('/login');
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setMenuDraw(false);
      } else {
        setMenuDraw(true);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <MenuBar position="fixed" elevation={0}>
      <Toolbar className="menu_tool_bar">
        <Box>
          {menuDraw ? (
            <IconButton
              className="mobile_button_menu"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              className="mobile_button_menu"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleMobile}
            >
              <MenuIcon />
            </IconButton>
          )}
          LOGO
        </Box>

        <Box>
          <IconButton disableRipple color="inherit">
            <Badge badgeContent={69} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton disableRipple onClick={handleMenu} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            <UserName>
              <p className="name">Admin User</p>
              <p className="email">sample@sample</p>
            </UserName>
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        style={{ marginTop: '10px' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </MenuBar>
  );
};

export default MenuHeader;
