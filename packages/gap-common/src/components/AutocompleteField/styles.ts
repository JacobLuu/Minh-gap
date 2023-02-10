import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { BLACK_COLOR, BORDER_COLOR } from '../../themes/Colors';

export const StyledPaper = styled(Paper)`
  color: ${BLACK_COLOR};
  width: 100%;
  text-transform: capitalize;
  border-radius: 14px;
  margin-top: 10px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid ${BORDER_COLOR};
`;
