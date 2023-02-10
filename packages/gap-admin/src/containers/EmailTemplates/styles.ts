import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import { CONTENT_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)``;

export const HeaderTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  padding-right: 10px;
`;

export const Text = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
`;
