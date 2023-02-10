import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FONT_STYLES_HEADLINE } from '../../themes/Fonts';
import { BLACK_COLOR } from '../../themes/Colors';

export const Wrapper = styled(Box)`
  padding: 17px 24px;
`;

export const HeaderTitle = styled(Typography)`
  ${FONT_STYLES_HEADLINE}
  color: ${BLACK_COLOR};
`;

export default Wrapper;
