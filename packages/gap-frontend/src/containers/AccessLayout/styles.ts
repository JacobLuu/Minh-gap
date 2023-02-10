import {
  BLACK_COLOR,
  CONTENT_COLOR,
  PRIMARY_COLOR,
} from 'gap-common/src/themes/Colors';
import { FONT_STYLES_BUTTON } from 'gap-common/src/themes/Fonts';
import styled from 'styled-components';

import login_bg from './assets/images/login_bg.svg';

export const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    color: ${BLACK_COLOR};
    margin-bottom: 5px;
  }

  .sub_title {
    color: ${CONTENT_COLOR};
    margin-bottom: 32px;
  }

  .text_error {
    text-align: center;
  }

  .link_redirect {
    ${FONT_STYLES_BUTTON}
    text-align: center;
    margin: 20px 0;
    color: ${CONTENT_COLOR};

    a {
      text-decoration: none;
      color: ${PRIMARY_COLOR};
    }
  }

  .login_bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url(${login_bg});
    background-repeat: no-repeat;
    background-position-x: -120px;
    background-position-y: center;
  }
`;
