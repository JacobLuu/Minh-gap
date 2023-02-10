import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { FONT_STYLES_BUTTON, FONT_STYLES_CAPTION } from '../../themes/Fonts';
import { WHITE_COLOR, BLACK_COLOR, CONTENT_COLOR } from '../../themes/Colors';

export const MenuBar = styled(Box)`
  .menu_tool_bar {
    display: flex;
    justify-content: space-between;
    background-color: ${WHITE_COLOR};
    ${FONT_STYLES_BUTTON}
  }

  .menu_tool_bar_title {
    ${FONT_STYLES_BUTTON}
    color: ${BLACK_COLOR};
  }

  .MuiIconButton-root:hover {
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
  }

  .user_menu {
    display: block;
  }

  .user_menu_arrow {
    transform: rotate(${({ open }) => (open ? '180deg' : '0deg')});
  }
`;

export const UserName = styled(Box)`
  padding-right: 12px;
  box-sizing: border-box;
  .name {
    ${FONT_STYLES_BUTTON}
    text-align: right;
    color: ${BLACK_COLOR};
  }
  .email {
    ${FONT_STYLES_CAPTION}
    text-align: right;
    color: ${CONTENT_COLOR};
  }
`;
