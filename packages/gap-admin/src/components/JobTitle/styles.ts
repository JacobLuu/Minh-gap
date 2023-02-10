import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PRIMARY_COLOR } from '../../themes/Colors';
import { FONT_STYLES_LABEL } from '../../themes/Fonts';

export const Title = styled(Typography)`
  ${FONT_STYLES_LABEL}
  color: ${PRIMARY_COLOR};
  padding: 6px 12px;
  border-radius: 8px;
`;
