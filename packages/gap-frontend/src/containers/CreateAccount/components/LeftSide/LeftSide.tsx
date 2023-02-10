import logoImg from 'gap-common/src/assets/images/logo_mark.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import dotGroupPink from '../../../../assets/images/dot_group_pink.svg';
import dotGroupWhite from '../../../../assets/images/dot_group_white.svg';
import lockOutline from '../../../../assets/images/lock_outline_login.svg';
import { BLACK_COLOR, CONTENT_COLOR } from '../../../../themes/Colors';
import {
  BaseBox,
  LeftBottomBox,
  PinkDotBox,
  RightTopBox,
  WhiteDotBox,
} from './style';

function LeftSide() {
  const { t } = useTranslation();

  return (
    <BaseBox pt={10}>
      <RightTopBox>
        <WhiteDotBox>
          <img src={dotGroupWhite} alt="dot group" height={130} />
        </WhiteDotBox>
      </RightTopBox>
      <Box zIndex={1} position="relative">
        <Box ml={16} width="70%">
          <img src={logoImg} alt="logo" width={76} height={76} />
          <Box display="flex" alignItems="center" mt={4}>
            <Box mr={2} mt={1}>
              <CheckCircle style={{ color: '#6CC1E4' }} />
            </Box>
            <Typography variant="label" color={BLACK_COLOR}>
              {t<string>('create_account.benefits.benefit1')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={4}>
            <Box mr={2} mt={1}>
              <CheckCircle style={{ color: '#6CC1E4' }} />
            </Box>
            <Typography variant="label" color={BLACK_COLOR}>
              {t<string>('create_account.benefits.benefit2')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={4}>
            <Box mr={2} mt={1}>
              <CheckCircle style={{ color: '#6CC1E4' }} />
            </Box>
            <Typography variant="label" color={BLACK_COLOR}>
              {t<string>('create_account.benefits.benefit3')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={4}>
            <Box mr={2} mt={1}>
              <CheckCircle style={{ color: '#6CC1E4' }} />
            </Box>
            <Typography variant="label" color={BLACK_COLOR}>
              {t<string>('create_account.benefits.benefit4')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={4}>
            <Box mr={2} mt={1}>
              <CheckCircle style={{ color: '#6CC1E4' }} />
            </Box>
            <Typography variant="label" color={BLACK_COLOR}>
              {t<string>('create_account.benefits.benefit5')}
            </Typography>
          </Box>
          <Box mt={9} ml={1}>
            <Typography variant="body2" color={CONTENT_COLOR}>
              @2022 gap personnel. All right Reserved
            </Typography>
          </Box>
        </Box>
      </Box>
      <LeftBottomBox display="flex" alignItems="flex-end">
        <img src={lockOutline} alt="lock" />
        <PinkDotBox>
          <img src={dotGroupPink} alt="dot group" height={130} />
        </PinkDotBox>
      </LeftBottomBox>
    </BaseBox>
  );
}

export default React.memo(LeftSide);
