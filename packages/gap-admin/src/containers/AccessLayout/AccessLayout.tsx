import React, { ReactNode, useRef, useEffect, memo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import login from './assets/images/logo.svg';
import { Wrapper } from './styles';
import { scrollTop } from '../../utils/customHooks';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../themes/Colors';

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

  useEffect(() => {
    scrollTop(scrollToTopRef);
  }, [scrollToTop]);

  return (
    <Wrapper ref={scrollToTopRef}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={false}
          md={5}
          lg={6}
          sx={{
            background: PRIMARY_COLOR,
          }}
        >
          <div className="login_bg" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: WHITE_COLOR,
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '470px',
              height: '100%',
            }}
          >
            <img
              src={login}
              width="350px"
              alt="logo"
              style={{ marginBottom: '80px' }}
            />
            <Typography className="title">{title}</Typography>
            <Typography className="sub_title">{subTitle}</Typography>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default memo(AccessLayout);
