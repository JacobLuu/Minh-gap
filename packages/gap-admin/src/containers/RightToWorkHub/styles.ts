import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FONT_STYLES_HELPER_TEXT, FONT_STYLES_LABEL } from '../../themes/Fonts';
import {
  CONTENT_COLOR,
  ERROR_COLOR,
  INFO_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
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
`;

export const HelperText = styled(Typography)`
  ${FONT_STYLES_HELPER_TEXT}
  color: ${CONTENT_COLOR};
`;

export const NameTitle = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${CONTENT_COLOR};
  font-weight: 500;
`;

export const ApproveBox = styled(Box)`
  background: rgba(103, 194, 58, 0.2);
  color: ${SUCCESS_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;

export const MoveToMatchMakerBox = styled(Box)`
  background: rgba(64, 158, 255, 0.2);
  color: ${INFO_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;

export const RejectedBox = styled(Box)`
  background: rgba(245, 108, 108, 0.2);
  color: ${ERROR_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;

export const PendingBox = styled(Box)`
  background: rgba(230, 162, 60, 0.2);
  color: ${WARNING_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;

export const EscalatedBox = styled(Box)`
  background: rgba(239, 234, 240, 1);
  color: ${PRIMARY_COLOR};
  padding: 7px 10px;
  border-radius: 10px;
  text-align: center;
`;
