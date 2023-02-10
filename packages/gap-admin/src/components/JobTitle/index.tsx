import React, { EventHandler } from 'react';
import Box from '@mui/material/Box';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Job } from '../../types/models';
import { Title } from './styles';

import {
  PRIMARY_COLOR,
  WHITE_COLOR,
  COMPLEMENTARY_COLOR,
} from '../../themes/Colors';

interface IJobTitle {
  jobs: Job[];
  isJobListOpen: boolean;
  onClick: EventHandler<any>;
}

const JobTitle = ({ jobs, isJobListOpen, onClick }: IJobTitle) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      <Title
        sx={{
          backgroundColor: COMPLEMENTARY_COLOR,
        }}
      >
        {jobs?.[0]?.id} - {jobs?.[0]?.title} {`(${jobs?.[0]?.branch_name})`}
      </Title>
      {jobs?.length > 1 && (
        <ArrowBackIosNewRoundedIcon
          sx={{
            backgroundColor: isJobListOpen
              ? PRIMARY_COLOR
              : COMPLEMENTARY_COLOR,
            padding: '10px',
            width: '32px',
            height: '32px',
            marginLeft: '10px',
            color: isJobListOpen ? WHITE_COLOR : PRIMARY_COLOR,
            borderRadius: '8px',
            transform: 'rotate(-90deg)',
            cursor: 'pointer',
          }}
          onClick={onClick}
        />
      )}
    </Box>
  );
};

export default JobTitle;
