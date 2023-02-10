import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PRIMARY_COLOR } from '../../themes/Colors';

export const Sort = styled(Box)`
  height: 20px;
  cursor: pointer;
  transform: rotatex(${({ direction }) => (direction ? '180deg' : '0deg')});

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;
