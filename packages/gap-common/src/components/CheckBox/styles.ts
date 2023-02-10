import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';

export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
`;
