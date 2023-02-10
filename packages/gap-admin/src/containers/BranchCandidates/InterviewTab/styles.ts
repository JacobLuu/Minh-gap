import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_LABEL } from '../../../themes/Fonts';
import {
  BAR_TABLE,
  CONTENT_COLOR,
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '../../../themes/Colors';

export const Wrapper = styled(Box)``;

export const HeaderTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  padding-right: 10px;
`;

export const ContentTabList = styled(Box)`
  & .MuiTabScrollButton-root.Mui-disabled {
    display: none;
  }
`;

export const ApproveBox = styled(Box)`
  width: 45px;
  background: rgba(103, 194, 58, 0.2);
  color: ${SUCCESS_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;

export const RejectedBox = styled(Box)`
  width: 45px;
  background: rgba(245, 108, 108, 0.2);
  color: ${ERROR_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
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
