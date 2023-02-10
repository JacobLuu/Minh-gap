import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import { CONTENT_COLOR, BAR_TABLE } from '../../themes/Colors';

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

export const ContentTabList = styled(Box)`
  & .MuiTabScrollButton-root.Mui-disabled {
    display: none;
  }
`;

export const Record = styled(Box)`
  padding: 12px 0;
`;

export const Dot = styled(Box)`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: currentColor;
  display: inline-block;
`;

export const TitleBar = styled(Box)`
  width: 100%;
  padding: 12px 20px;
  background-color: ${BAR_TABLE};
`;
