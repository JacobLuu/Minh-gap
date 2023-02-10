import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ReactComponent as Edit } from 'gap-common/src/assets/images/icon_log_edit.svg';
import moment from 'moment';

import { Record } from '../../styles';
import {
  ICON_COLOR,
  ERROR_COLOR,
  WHITE_COLOR,
} from '../../../../themes/Colors';

const mockData = [
  {
    id: 1,
    name: 'James Mclearn',
    title:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
    time: 1667550700755,
  },
  {
    id: 2,
    name: 'user 2',
    title:
      'Cannot contact candidates because of low signal Cannot candidates because of low signal',
    time: 1667550700755,
  },
  {
    id: 3,
    name: 'user 3',
    title:
      'Cannot contact candidates because of low signal Cannot candidates because of low signal',
    time: 1667550700755,
  },
];

const IssueLogs = () => {
  return (
    <>
      {mockData?.map((item) => (
        <Record key={item.id}>
          <Box display="flex" alignItems="baseline">
            <Box display="flex" alignItems="center">
              <Edit width="12px" height="12px" fill={ICON_COLOR} />
            </Box>

            <Typography pl={3} variant="caption" color="text.content">
              {moment(item?.time).format('DD/MM/YYYY, HH:mm')} -{' '}
              <Typography
                component="span"
                variant="caption"
                color="text.content"
                fontWeight={500}
              >
                {item?.name}
              </Typography>
            </Typography>
          </Box>
          <Chip
            sx={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: 6,
              backgroundColor: ERROR_COLOR,
              color: WHITE_COLOR,
              borderRadius: '8px',
            }}
            label="Others"
            color="secondary"
          />
          <Typography pl={6} variant="subtitle2">
            {item?.title}
          </Typography>
        </Record>
      ))}
    </>
  );
};

export default IssueLogs;
