import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { BLACK_COLOR, BORDER_COLOR, PRIMARY_COLOR } from '../../themes/Colors';

export const StyledAutocomplete = styled(Autocomplete)`
  text-transform: capitalize;
  .MuiChip-root {
    margin: 8px 4px;
  }
`;

export const StyledPaper = styled(Paper)`
  color: ${BLACK_COLOR};
  text-transform: capitalize;
  border-radius: 14px;
  margin-top: 10px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid ${BORDER_COLOR};
  .Mui-focused,
  .Mui-focused:hover {
    background-color: transparent !important;
    color: ${PRIMARY_COLOR};
  }
  .MuiAutocomplete-option[aria-selected='true'] {
    background-color: transparent !important;
  }
  .MuiAutocomplete-option[aria-selected='true']:hover {
    background-color: transparent !important;
  }
`;
