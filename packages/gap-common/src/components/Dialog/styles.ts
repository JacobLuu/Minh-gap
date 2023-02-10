import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import {
  FONT_STYLES_SUB_TITLE_MEDIUM,
  FONT_STYLES_CAPTION,
} from '../../themes/Fonts';
import { BLACK_COLOR, CONTENT_COLOR } from '../../themes/Colors';

export const Container = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
  }

  .title {
    padding-bottom: 12px;
    color: ${BLACK_COLOR};
  }

  .description {
    ${FONT_STYLES_SUB_TITLE_MEDIUM}
    padding-bottom: 24px;
    color: ${CONTENT_COLOR};
  }

  .content {
    text-align: ${({ contentcenter }) => (contentcenter === 'true' ? 'center' : 'left')};
    box-sizing: border-box;
    max-width: ${({ maxWidth }) => maxWidth};
    width: ${({ maxWidth }) => maxWidth};
    padding: 20px;
  }

  .content_categoryReferenceDescription {
    ${FONT_STYLES_CAPTION}
    padding-top: 5px;
  }

  .MuiButton-outlined {
    padding: 0 20px;
  }

  .MuiButton-contained {
    padding: 0 20px;
  }

  .MuiDialog-paperFullWidth {
    padding: 20px;
  }
`;
