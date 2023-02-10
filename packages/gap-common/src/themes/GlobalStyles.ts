import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
} from './Fonts';
import { BLACK_COLOR, BACKGROUND_COLOR } from './Colors';

const GlobalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  body: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: DEFAULT_FONT_WEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    color: BLACK_COLOR,
  },
};

export default GlobalStyles;
