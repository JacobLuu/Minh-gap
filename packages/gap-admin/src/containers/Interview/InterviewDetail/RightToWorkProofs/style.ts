import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ReactComponent as Menu } from 'gap-common/src/assets/images/icon_menu_circle.svg';

export const ImageContainer = styled(Box)`
  width: 200px;
  position: relative;
  margin-right: 12px;
  display: inline-block;
`;

export const MenuCircle = styled(Menu)`
  position: absolute;
  right: 0;
  margin: 10px;
  cursor: pointer;
`;

export const Image = styled(Box)`
  background: ${(props) => `url(${props.src}) no-repeat center center`};
  background-size: cover;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
`;
