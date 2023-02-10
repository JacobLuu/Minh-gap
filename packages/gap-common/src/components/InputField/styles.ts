import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ERROR_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)`
  .MuiFormControl-root {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .MuiFormHelperText-root {
    margin-top: 12px;
    margin-left: 0px;
  }

  .MuiFormHelperText-root.Mui-error {
    color: ${ERROR_COLOR};
  }
`;
