import { createTheme, ThemeOptions } from '@mui/material/styles';
import lodash from 'lodash';
import {
  ICON_COLOR,
  PRIMARY_COLOR,
  BLACK_COLOR,
  SECONDARY_COLOR,
  CONTENT_COLOR,
  WHITE_COLOR,
  BORDER_COLOR,
  INFO_COLOR,
  PLACEHOLDER_COLOR,
  BUTTON_PRIMARY_COLOR,
  ERROR_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
  INACTIVE_COLOR,
  COMPLEMENTARY_COLOR,
  SUCCESS_BG_COLOR,
  ERROR_BG_COLOR,
  BAR_TABLE,
  DISABLED_CONTENT_COLOR,
  DISABLED_BACKGROUND_COLOR,
} from './Colors';

import GlobalStyles from './GlobalStyles';

import {
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_BUTTON_FONT_WEIGHT,
  HEADING1_FONT_SIZE,
  HEADING2_FONT_SIZE,
  HEADING3_FONT_SIZE,
  HEADING4_FONT_SIZE,
  SUBTITLE_FONT_SIZE,
  HEADING1_FONT_WEIGHT,
  HEADING2_FONT_WEIGHT,
  HEADING3_FONT_WEIGHT,
  HEADING4_FONT_WEIGHT,
  BODY1_FONT_WEIGHT,
  BODY2_FONT_WEIGHT,
  CAPTION_FONT_SIZE,
  LABEL_FONT_SIZE,
  SUBTITLE2_FONT_SIZE,
} from './Fonts';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    label: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    label?: React.CSSProperties;
  }

  interface Palette {
    icon: Palette;
  }

  interface PaletteOptions {
    icon?: PaletteOptions;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    label: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    icon: true;
  }
}

const useTheme = (override = {}) => {
  return createTheme(
    lodash.merge(
      {
        spacing: 4,
        typography: {
          allVariants: {
            color: BLACK_COLOR,
          },
          fontFamily: DEFAULT_FONT_FAMILY,
          fontSize: DEFAULT_FONT_SIZE,
          h1: {
            fontSize: HEADING1_FONT_SIZE,
            fontWeight: HEADING1_FONT_WEIGHT,
          },
          h2: {
            fontSize: HEADING2_FONT_SIZE,
            fontWeight: HEADING2_FONT_WEIGHT,
          },
          h3: {
            fontSize: HEADING3_FONT_SIZE,
            fontWeight: HEADING3_FONT_WEIGHT,
          },
          h4: {
            fontSize: HEADING4_FONT_SIZE,
            fontWeight: HEADING3_FONT_WEIGHT,
          },
          body1: {
            fontSize: DEFAULT_FONT_SIZE,
            fontWeight: BODY1_FONT_WEIGHT,
          },
          body2: {
            fontSize: DEFAULT_FONT_SIZE,
            fontWeight: BODY2_FONT_WEIGHT,
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
          label: {
            fontSize: LABEL_FONT_SIZE,
            fontWeight: DEFAULT_FONT_WEIGHT,
          },
          caption: {
            fontSize: CAPTION_FONT_SIZE,
            fontWeight: DEFAULT_FONT_WEIGHT,
          },
          link: {
            fontSize: LABEL_FONT_SIZE,
            fontWeight: DEFAULT_FONT_WEIGHT,
          },
        },
        palette: {
          text: {
            content: CONTENT_COLOR,
            success: SUCCESS_COLOR,
            error: ERROR_COLOR,
            warning: WARNING_COLOR,
            inactive: INACTIVE_COLOR,
          },
          primary: {
            main: PRIMARY_COLOR,
          },
          secondary: {
            main: SECONDARY_COLOR,
          },
          info: {
            main: INFO_COLOR,
          },
          error: {
            main: ERROR_COLOR,
          },
          success: {
            main: SUCCESS_COLOR,
          },
          warning: {
            main: WARNING_COLOR,
          },
          divider: BORDER_COLOR,
          icon: {
            main: ICON_COLOR,
          },
          content: {
            main: CONTENT_COLOR,
          },
          inactive: {
            main: INACTIVE_COLOR,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: GlobalStyles,
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                minHeight: '45px',
                borderRadius: 14,
                color: CONTENT_COLOR,
                paddingRight: 0,
                fontStyle: 'normal',
                fontWeight: DEFAULT_FONT_WEIGHT,
                fontSize: DEFAULT_FONT_SIZE,
                '&.Mui-disabled': {
                  color: DISABLED_CONTENT_COLOR,
                  backgroundColor: DISABLED_BACKGROUND_COLOR,
                  input: {
                    color: DISABLED_CONTENT_COLOR,
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  },
                },
                '& input::placeholder': {
                  color: PLACEHOLDER_COLOR,
                  opacity: 1,
                },
                padding: '0 16px',
                '.MuiOutlinedInput-input': {
                  padding: '0px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: `1px solid ${BORDER_COLOR}`,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: `1px solid ${BORDER_COLOR}`,
                },
                '.MuiSelect-icon': {
                  top: 'calc(50% - 10px)',
                },
                backgroundColor: WHITE_COLOR,
                input: {
                  color: CONTENT_COLOR,
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                },
              },
              multiline: {
                borderRadius: 8,
                textarea: {
                  resize: 'vertical',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              colorPrimary: {
                color: WHITE_COLOR,
                backgroundColor: PRIMARY_COLOR,
                borderRadius: '8px',
              },
              colorSecondary: {
                borderRadius: '8px',
                color: PRIMARY_COLOR,
                backgroundColor: COMPLEMENTARY_COLOR,
              },
              colorSuccess: {
                color: SUCCESS_COLOR,
                backgroundColor: SUCCESS_BG_COLOR,
                borderRadius: '4px',
              },
              colorError: {
                color: ERROR_COLOR,
                backgroundColor: ERROR_BG_COLOR,
                borderRadius: '4px',
              },
            },
          },
          MuiTab: {
            defaultProps: {
              disableRipple: true,
            },
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  color: PRIMARY_COLOR,
                },
                color: INACTIVE_COLOR,
                textTransform: 'capitalize',
                padding: '16px 0',
                marginRight: '32px',
                fontWeight: HEADING4_FONT_WEIGHT,
                fontSize: DEFAULT_FONT_SIZE,
              },
            },
          },
          MuiTabPanel: {
            styleOverrides: {
              root: {
                padding: '28px 0 0 0',
              },
            },
          },
          MuiAutocomplete: {
            styleOverrides: {
              root: {
                '.MuiOutlinedInput-root': {
                  padding: '0 14px',
                },
                '.MuiOutlinedInput-input': {
                  padding: '0px',
                },
                '.MuiAutocomplete-endAdornment': {
                  top: 'calc(50% - 12px)',
                },
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                color: CONTENT_COLOR,
                borderRadius: '16px',
                backgroundColor: WHITE_COLOR,
                padding: '8px 16px',
                boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.16)',
              },
              arrow: {
                fontSize: 16,
                width: 16,
                color: WHITE_COLOR,
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              root: {
                '& .MuiPaper-root': {
                  borderRadius: '16px',
                  marginTop: '10px',
                  boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)',
                  border: `1px solid ${BORDER_COLOR}`,
                },
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                '&$selected': {
                  backgroundColor: 'transparent',
                },
                '&$focused': {
                  backgroundColor: 'transparent',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                '.MuiAutocomplete-option': {
                  backgroundColor: 'transparent',
                },
                "&.MuiAutocomplete-option[aria-selected='true']": {
                  backgroundColor: 'transparent',
                },
                "&.MuiAutocomplete-option[aria-selected='true']&:hover": {
                  backgroundColor: 'transparent',
                },
              },
            },
          },
          MuiIconButton: {
            defaultProps: {
              disableRipple: true,
            },
          },
          MuiButton: {
            defaultProps: {
              disableRipple: true,
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                minWidth: 'none',
                fontStyle: 'normal',
                fontWeight: DEFAULT_BUTTON_FONT_WEIGHT,
                fontSize: DEFAULT_FONT_SIZE,
                borderRadius: 14,
                height: 45,
                textTransform: 'capitalize',
              },
              contained: {
                color: WHITE_COLOR,
                '&.Mui-disabled': {
                  backgroundColor: PRIMARY_COLOR,
                  color: WHITE_COLOR,
                  opacity: 0.5,
                },
              },
              outlined: {
                backgroundColor: WHITE_COLOR,
                border: `1px solid ${BORDER_COLOR}`,
                '&.Mui-disabled': {
                  backgroundColor: BAR_TABLE,
                  color: PRIMARY_COLOR,
                  opacity: 0.4,
                  border: 'none',
                },
              },
              text: {
                padding: '0px',
              },
              textPrimary: {
                '&:hover': {
                  'background-color': 'inherit',
                },
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: 'none',
                borderTop: `1px solid ${BORDER_COLOR}`,
                '&:first-of-type': {
                  paddingLeft: '30px',
                },
                '&:last-of-type': {
                  paddingRight: '30px',
                },
              },
            },
          },
          MuiTypography: {
            variants: [
              {
                props: {
                  variant: 'link',
                },
                style: {
                  color: INFO_COLOR,
                  fontSize: DEFAULT_FONT_SIZE,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                },
              },
            ],
          },
          MuiDialogContent: {
            styleOverrides: {
              root: {
                padding: 0,
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              colorSecondary: {
                '& path': {
                  color: BUTTON_PRIMARY_COLOR,
                },
              },
            },
          },
        },
      },
      override,
    ) as unknown as ThemeOptions,
  );
};

export default useTheme;
