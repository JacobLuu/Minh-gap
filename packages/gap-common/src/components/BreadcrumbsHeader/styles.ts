import { Breadcrumbs, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FONT_STYLES_CAPTION } from '../../themes/Fonts';
import { PRIMARY_COLOR } from '../../themes/Colors';

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  .MuiBreadcrumbs-separator {
    margin: 0;
  }

  .MuiBreadcrumbs-li a {
    text-decoration-line: none;
  }

  .MuiBreadcrumbs-li:last-child {
    .MuiTypography-root {
      color: ${PRIMARY_COLOR};
    }
  }
` as typeof Breadcrumbs;

export const Text = styled(Typography)`
  ${FONT_STYLES_CAPTION}
` as typeof Typography;
