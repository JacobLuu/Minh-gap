import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { BAR_TABLE } from '../../themes/Colors';

export const Container = styled(Box)`
  background-color: ${BAR_TABLE};
  border-radius: 8px;
  .dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: currentColor;
    display: inline-block;
  }
`;

export const EllipsisText = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
