import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import {
  BODY2_FONT_WEIGHT,
  DEFAULT_FONT_WEIGHT,
} from 'gap-common/src/themes/Fonts';

import isPropValid from '@emotion/is-prop-valid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface TypoProps {
  $active: boolean;
}

export const Text = styled(Typography, {
  shouldForwardProp: (prop) => isPropValid(String(prop)),
})<TypoProps>`
  color: ${(props) => (props.$active ? PRIMARY_COLOR : '')};
  font-weight: ${(props) =>
    props.$active ? BODY2_FONT_WEIGHT : DEFAULT_FONT_WEIGHT};
`;
