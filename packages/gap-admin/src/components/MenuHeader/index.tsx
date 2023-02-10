import React, { useState, MouseEvent, useLayoutEffect } from 'react';
import {
  Box,
  Toolbar,
  MenuItem,
  Avatar,
  ListItemIcon,
  Menu,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InputSelectField from 'gap-common/src/components/InputSelectField/InputSelectFieldUnControl';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { MenuBar, UserName } from './styles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';
import { isConsultant } from '../../utils/userRoles';

import {
  getToken,
  getSelectedBranch,
  getAccountInfo,
  setSelectedBranch,
  removeCachedUrl,
  removeAccessToken,
  removeAccountInfo,
  removeBranchSelected,
} from '../../utils/localStorage';
import { dispatchLogout } from '../../utils/dispatchLogout';

const MenuHeader = ({ handleDrawerToggle, handleDrawerToggleMobile }: any) => {
  const accessToken = getToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuDraw, setMenuDraw] = useState(true);
  const open = Boolean(anchorEl);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const accountInfo = getAccountInfo();
  const branchSelected = getSelectedBranch();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlebranchSelect = (e) => {
    setSelectedBranch(e.target.value);
    window.location.reload(false);
  };
  const handleLogout = () => {
    dispatchLogout({ accessToken: accessToken });
    removeCachedUrl();
    removeAccessToken();
    removeAccountInfo();
    removeBranchSelected();
    history.replace(CLIENT_PATH.LOGIN);
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
    <MenuBar open={open}>
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
          <span className="menu_tool_bar_title">
            Welcome to gap personnel Administration
          </span>
        </Box>

        <Box display="flex" alignItems="center">
          {isConsultant() && (
            <InputSelectField
              options={accountInfo?.branches}
              defaultValue={branchSelected}
              sx={{ minHeight: '32px', marginRight: '20px' }}
              onChange={(e) => {
                handlebranchSelect(e);
              }}
            />
          )}

          <IconButton disableRipple onClick={handleMenu} color="inherit">
            <UserName>
              <p className="name">{accountInfo?.name}</p>
              <p className="email">{accountInfo?.email}</p>
            </UserName>
            <Avatar
              sx={{ width: 32, height: 32 }}
              {...getShortcutName(accountInfo?.name)}
            />
            <ExpandMoreRoundedIcon className="user_menu_arrow" />
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
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
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
