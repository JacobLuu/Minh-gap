import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import { ERROR_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)`
  margin: 0 0 24px 0;

  .label {
    ${FONT_STYLES_LABEL}
  }

  .label.error {
    color: ${ERROR_COLOR};
  }

  .MuiFormControl-root {
    margin-top: 8px;
    margin-bottom: 0px;
  }

  .MuiFormHelperText-root {
    margin-top: 12px;
    margin-left: 0px;
  }

  .MuiFormHelperText-root.Mui-error {
    color: ${ERROR_COLOR};
  }
` as typeof Box;

export const ValidateCriteriaWrapper = styled(Box)`
  margin-top: 12px;
  margin-bottom: 12px;

  .MuiFormHelperText-root {
    margin-top: 0px;
    margin-left: 0px;
  }

  ul {
    padding: 0 0 0 30px;
  }
` as typeof Box;
