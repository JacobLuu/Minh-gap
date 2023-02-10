import React from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as AdvertRespond } from 'gap-common/src/assets/images/AdvertRespond.svg';
import moment from 'moment';

import { Record } from './styles';
import { ICON_COLOR } from '../../../themes/Colors';

const Records = ({ contactLogsData }) => {
  return (
    <>
      {contactLogsData?.length === 0 && (
        <Typography variant="subtitle2" color="text.content">
          No record yet
        </Typography>
      )}
      {contactLogsData?.map((item) => (
        <Record key={item.id}>
          <Box display="flex" alignItems="baseline">
            <Box>
              <AdvertRespond width="12px" height="12px" fill={ICON_COLOR} />
            </Box>
            <Typography pl={3} variant="subtitle2">
              {item?.content}
            </Typography>
          </Box>
          <Typography pl={6} variant="caption" color="text.content">
            {item?.user && `${item?.user?.name} - `}
            {moment.unix(item?.posted_at).format('DD/MM/YYYY, HH:mm')}
          </Typography>
        </Record>
      ))}
    </>
  );
};

export default Records;
