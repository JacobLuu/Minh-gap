import React from 'react';

import { Box, Grid } from '@mui/material';

import { useBreakPoints } from '../../utils/customHooks';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

function CreateAccount() {
  const { isScreenSm } = useBreakPoints();
  return (
    <Box>
      <Grid container sx={{ height: '100vh' }}>
        {isScreenSm && (
          <Grid item xs={0} sm={5} xl={4}>
            <LeftSide />
          </Grid>
        )}
        <Grid item xs={12} sm={7} xl={8}>
          <RightSide />
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(CreateAccount);
