import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';
import {
  CONTENT_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
  INACTIVE_COLOR,
  BORDER_COLOR,
  BAR_TABLE,
} from '../../themes/Colors';

interface BranchCandidatesProps {
  $active: boolean;
}

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
  border-bottom: 1px solid ${BORDER_COLOR};
  padding: 12px 0;
  &:last-of-type {
    border-bottom: none;
  }
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

export const Wrapper = styled(Box)``;

export const TabContainer = styled(Tabs)`
  display: flex;
  align-items: center;
  background-color: ${WHITE_COLOR};
  width: 290px;
  height: 52px;
  border-radius: 8px;
  .MuiTabs-flexContainer {
    justify-content: center;
  }
  .MuiTab-root {
    min-height: 36px;
    width: 135px;
    @media (min-width: 600px) {
      min-width: 135px;
    }
  }
`;

export const SettingsTab = styled(Tab)<BranchCandidatesProps & TabProps>`
  background-color: ${(props) => (props.$active ? PRIMARY_COLOR : WHITE_COLOR)};
  color: ${(props) => (props.$active ? WHITE_COLOR : INACTIVE_COLOR)};
  margin: 0px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  width: fit-content;
  height: 36px;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    min-width: 100px;
  }
  &.Mui-selected {
    color: ${(props) => (props.$active ? WHITE_COLOR : INACTIVE_COLOR)};
  }
`;
