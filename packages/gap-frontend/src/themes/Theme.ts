import { BUTTON_PRIMARY_COLOR, WHITE_COLOR, BLACK_COLOR } from './Colors';

import {
  DEFAULT_FONT_SIZE,
  SUBTITLE_FONT_SIZE,
  SUBTITLE2_FONT_SIZE,
  HEADING2_FONT_SIZE,
  CAPTION_FONT_SIZE,
  BODY1_FONT_WEIGHT,
  BODY2_FONT_WEIGHT,
  BODY3_FONT_WEIGHT,
  DEFAULT_FONT_WEIGHT,
  HEADING2_FONT_WEIGHT,
  HEADING3_FONT_WEIGHT,
} from './Fonts';

const overrideTheme = {
  typography: {
    h2: {
      fontSize: HEADING2_FONT_SIZE,
      fontWeight: HEADING2_FONT_WEIGHT,
    },
    body1: {
      fontSize: DEFAULT_FONT_SIZE,
      fontWeight: BODY1_FONT_WEIGHT,
    },
    body2: {
      fontSize: DEFAULT_FONT_SIZE,
      fontWeight: BODY2_FONT_WEIGHT,
    },
    body3: {
      fontSize: DEFAULT_FONT_SIZE,
      fontWeight: BODY3_FONT_WEIGHT,
    },
    optionText: {
      fontSize: DEFAULT_FONT_SIZE,
      fontWeight: DEFAULT_FONT_WEIGHT,
    },
    subtitle1: {
      fontSize: SUBTITLE_FONT_SIZE,
      fontWeight: HEADING3_FONT_WEIGHT,
    },
    subtitle2: {
      fontSize: SUBTITLE2_FONT_SIZE,
      fontWeight: DEFAULT_FONT_WEIGHT,
    },
    subtitle3: {
      fontSize: SUBTITLE_FONT_SIZE,
      fontWeight: DEFAULT_FONT_WEIGHT,
    },
    caption: {
      fontSize: CAPTION_FONT_SIZE,
      fontWeight: DEFAULT_FONT_WEIGHT,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: WHITE_COLOR,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: {
            variant: 'login',
          },
          style: {
            color: WHITE_COLOR,
            backgroundColor: BUTTON_PRIMARY_COLOR,
            width: 428,
            height: 44,
          },
        },
      ],
    },
    MuiSvgIcon: {
      variants: [
        {
          props: {
            color: 'list',
          },
          style: {
            '& path': {
              color: `${BUTTON_PRIMARY_COLOR}`,
            },
          },
        },
        {
          props: {
            color: 'white',
          },
          style: {
            '& path': {
              color: `${WHITE_COLOR}`,
            },
          },
        },
        {
          props: {
            color: 'black',
          },
          style: {
            '& path': {
              color: `${BLACK_COLOR}`,
            },
          },
        },
      ],
    },
  },
};

export default overrideTheme;
