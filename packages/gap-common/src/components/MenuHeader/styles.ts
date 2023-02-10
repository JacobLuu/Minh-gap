import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';

import { FONT_STYLES_CAPTION, FONT_STYLES_BUTTON } from '../../themes/Fonts';
import { PRIMARY_COLOR } from '../../themes/Colors';

export const MenuBar = styled(AppBar)`
  .menu_tool_bar {
    display: flex;
    justify-content: space-between;
    background-color: ${PRIMARY_COLOR};
  }
  .MuiIconButton-root:hover {
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
  }
  .mobile_button_menu {
    @media only screen and (min-width: 768px) {
      display: none;
    }
  }
  .user_menu {
    display: block;
  }
`;

export const UserName = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
  .name {
    ${FONT_STYLES_BUTTON}
    letter-spacing: 0em;
    text-align: left;
  }
  .email {
    ${FONT_STYLES_CAPTION}
    letter-spacing: 0.01em;
    text-align: left;
  }
`;
