import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import bgImage from '../../assets/images/background_img_login.png';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('${bgImage}') no-repeat center center;
  background-size: cover;
  height: 100vh;
` as typeof Box;
