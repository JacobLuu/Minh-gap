import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  LIGHT_BLUE_COLOR,
  LIGHT_PINK_COLOR,
  PALE_BLUE_COLOR,
} from '../../../../themes/Colors';

export const BaseBox = styled(Box)`
  background-color: ${PALE_BLUE_COLOR};
  height: 100%;
  position: relative;
` as typeof Box;

export const RightTopBox = styled(Box)`
  background-color: ${LIGHT_PINK_COLOR};
  width: 175px;
  height: 100px;
  position: absolute;
  top: 0;
  right: 0;
` as typeof Box;

export const LeftBottomBox = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 52%;
  width: 50%;
  border-radius: 0 80px 0 0;
  background-color: ${LIGHT_BLUE_COLOR};
` as typeof Box;

export const WhiteDotBox = styled(Box)`
  position: absolute;
  top: 30px;
  left: 0;
` as typeof Box;

export const PinkDotBox = styled(Box)`
  position: absolute;
  bottom: 80px;
  right: -20px;
` as typeof Box;
