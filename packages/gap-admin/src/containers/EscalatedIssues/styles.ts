import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import {
  COMPLEMENTARY_COLOR,
  CONTENT_COLOR,
  BORDER_COLOR,
} from '../../themes/Colors';

export const Wrapper = styled(Box)``;

export const HeaderTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  padding-right: 10px;
`;

export const Text = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  white-space: nowrap;
`;

export const Record = styled(Box)`
  border-bottom: 1px solid ${BORDER_COLOR};
  padding: 12px 0;
  &:last-of-type {
    border-bottom: none;
  }
`;

export const JobApplyText = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  white-space: nowrap;
  background-color: ${COMPLEMENTARY_COLOR};
  border-radius: 8px;
  width: fit-content;
  height: 32px;
  padding: 6px 16px;
`;

export const ContentTabList = styled(Box)`
  & .MuiTabScrollButton-root.Mui-disabled {
    display: none;
  }
`;
