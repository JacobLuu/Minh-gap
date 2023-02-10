import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';

export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  .MuiFormControlLabel-root {
    margin-right: ${({ row }) => (row ? '40px' : '16px')};
  }
  .MuiBox-root:last-of-type {
    .MuiFormControlLabel-root {
      margin-right: 0px;
    }
  }
`;
