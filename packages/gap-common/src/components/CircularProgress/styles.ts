import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Content = styled(Box)`
  position: relative;
  width: 40px;
  height: 40px;
`;

export const CircularProgressStyled = styled(CircularProgress)`
  position: absolute;
  transform: rotate(180deg);
  stroke-linecap: round;
`;

export const TooltipTitle = styled(Box)`
  .dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: currentColor;
    display: inline-block;
  }
`;
