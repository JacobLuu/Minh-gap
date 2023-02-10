import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// eslint-disable-next-line import/no-unresolved
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../themes/Colors';

const drawerWidth = '260px';
const drawerWidthSmallScreen = '56px';

export const Sidebar = styled(Box)`
  display: flex;
  .MuiPaper-root {
    border-right: none;
    overflow: hidden;
  }
  .MuiAppBar-colorPrimary {
    z-index: 1;
    background-color: ${WHITE_COLOR};
  }
  .MuiListItemIcon-root {
    color: white;
    min-width: 0;
    margin: auto;
  }
  .MuiDrawer-paperAnchorLeft {
    width: ${drawerWidth};
  }
`;

export const SidebarDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
  z-index: 1;
  transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
  .menu_title {
    .MuiTypography-root {
      ${FONT_STYLES_LABEL}
      padding-left: 15px;
      color: ${WHITE_COLOR};
    }
  }
  .menu_icon {
    color: ${PRIMARY_COLOR};
  }
  .MuiDrawer-paperAnchorLeft {
    color: ${PRIMARY_COLOR};
    background: linear-gradient(
      144.72deg,
      ${PRIMARY_COLOR} -10.52%,
      #3d2a75 116.03%
    );
  }
  .sidebar_container {
    /* overflow: auto; */
  }

  .MuiListItem-root {
    padding: 12px 16px;
    margin: auto;
    width: ${({ open }) => (open ? '211px' : '50px')};
    height: 44px;
    color: ${WHITE_COLOR};
    border-radius: 16px;
  }

  .MuiListItem-root.Mui-selected,
  .Mui-selected:hover,
  .MuiListItem-root:hover {
    background: #906e9b !important;
  }

  @media only screen and (max-width: 768px) {
    .MuiListItem-root,
    .MuiListItem-root.Mui-selected,
    .Mui-selected:hover,
    .MuiListItem-root:hover {
      width: ${({ open }) => (open ? '211px' : '50px')};
      height: 44px;
    }
  }

  width: ${({ open }) => (open ? drawerWidth : drawerWidthSmallScreen)};
  transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
  .MuiDrawer-paperAnchorLeft {
    width: ${({ open }) => (open ? drawerWidth : drawerWidthSmallScreen)};
  }
  .menu_title {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }

  @media only screen and (max-width: 480px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    transition: margin-left 0.25s, margin-right 0.25s, width 0.25s, flex 0.25s;
  }
`;

export const SidebarDrawerMobile = styled(Drawer)`
  .menu_title {
    .MuiTypography-root {
      ${FONT_STYLES_LABEL}
      color: ${WHITE_COLOR};
      padding-left: 15px;
    }
  }

  .MuiListItem-root {
    padding: 12px 16px;
    margin: auto;
    height: 44px;
    color: ${WHITE_COLOR};
  }
  .MuiListItem-root.Mui-selected,
  .Mui-selected:hover,
  .MuiListItem-root:hover {
    background: #906e9b !important;
  }
  .MuiListItemIcon-root {
    min-width: 0px;
  }

  .MuiDrawer-paperAnchorLeft {
    color: ${PRIMARY_COLOR};
    background: linear-gradient(
      144.72deg,
      ${PRIMARY_COLOR} -10.52%,
      #3d2a75 116.03%
    );
  }
`;

export const Content = styled(Box)`
  width: calc(
    100% - ${({ open }) => (open ? drawerWidth : drawerWidthSmallScreen)}
  );
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
