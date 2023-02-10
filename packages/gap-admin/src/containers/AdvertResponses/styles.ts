import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import { CONTENT_COLOR, PRIMARY_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)``;

export const HeaderTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  padding-right: 10px;
`;

export const Text = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const JobTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${PRIMARY_COLOR};
  padding: 6px 12px;
  border-radius: 8px;
  width: fit-content;
`;
