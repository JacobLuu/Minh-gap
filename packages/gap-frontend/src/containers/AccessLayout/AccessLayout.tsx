import { PRIMARY_COLOR, WHITE_COLOR } from 'gap-common/src/themes/Colors';
import { scrollTop } from 'gap-common/src/utils/customHooks';
import React, { memo, ReactNode, useEffect, useMemo, useRef } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import logoImg from '../../assets/images/logo.svg';
import { useBreakPoints } from '../../utils/customHooks';
import { Wrapper } from './styles';

interface IAccessLayout {
  children: ReactNode;
  scrollToTop: ReactNode;
  title: string;
  subTitle: string;
}

function AccessLayout({
  children,
  scrollToTop,
  title,
  subTitle,
}: IAccessLayout) {
  const scrollToTopRef = useRef(null);
  const { isScreenSm, isScreenMd } = useBreakPoints();

  const containerPaddingLeft = useMemo(() => {
    if (isScreenMd) return 24;
    if (isScreenSm) return 20;
    return 12;
  }, [isScreenSm]);

  const containerPaddingRight = useMemo(() => {
    if (isScreenMd) return 34;
    if (isScreenSm) return 20;
    return 12;
  }, [isScreenSm]);

  useEffect(() => {
    scrollTop(scrollToTopRef);
  }, [scrollToTop]);

  return (
    <Wrapper ref={scrollToTopRef}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={0}
          sm={4}
          lg={5}
          sx={{
            background: PRIMARY_COLOR,
          }}
        >
          <div className="login_bg" data-test="login-bg-div" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          lg={7}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: WHITE_COLOR,
            flex: 1,
          }}
          pl={containerPaddingLeft}
          pr={containerPaddingRight}
          py={isScreenSm ? 2 : 8}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box width={isScreenSm ? '350px' : '250px'}>
              <img
                src={logoImg}
                width="100%"
                alt="logo"
                style={{ marginBottom: '80px' }}
                data-test="logo"
              />
            </Box>
            <Typography
              className="title"
              fontSize={isScreenSm ? 30 : 19}
              data-test="title"
            >
              {title}
            </Typography>
            <Typography
              className="sub_title"
              fontSize={14}
              fontWeight={400}
              data-test="sub-title"
            >
              {subTitle}
            </Typography>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default memo(AccessLayout);
