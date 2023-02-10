import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BORDER_COLOR } from '../../../themes/Colors';

export const Wrapper = styled(Box)``;

export const Record = styled(Box)`
  border-bottom: 1px solid ${BORDER_COLOR};
  padding: 12px 0;
  &:last-of-type {
    border-bottom: none;
  }
`;
