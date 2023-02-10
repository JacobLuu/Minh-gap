import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { WHITE_COLOR, BORDER_COLOR, ICON_COLOR } from '../../themes/Colors';

export const IconButtonStyled = styled(IconButton)`
  width: 44px;
  height: 44px;
  background-color: ${WHITE_COLOR};
  border-radius: 12px;
  border: 1px solid ${BORDER_COLOR};
  margin-left: 16px;
  &:hover {
    background-color: ${ICON_COLOR};
    svg {
      fill: ${WHITE_COLOR};
    }
  }
`;
