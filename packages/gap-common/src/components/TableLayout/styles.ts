import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL, FONT_STYLES_BUTTON } from '../../themes/Fonts';
import { CONTENT_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)`
  margin-top: 24px;
  .MuiPaper-root {
    border-radius: 12px;
  }
  .MuiTableHead-root {
    white-space: nowrap;
  }
  .records_pagination {
    ${FONT_STYLES_BUTTON}
    color: ${CONTENT_COLOR}
  }
`;

export const Text = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
`;

export const JobTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  padding: 6px 12px;
  border-radius: 8px;
`;
