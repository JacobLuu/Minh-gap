import React from 'react';
import { Box, TableCell, TableRow, Chip } from '@mui/material';

import { BACKGROUND_TABLE } from '../../../themes/Colors';
import { Job } from '../../../types/models';
import { Text } from '../styles';

interface IJobList {
  jobs: Job[];
  isJobListOpen: boolean;
}

const JobList = ({ jobs, isJobListOpen }: IJobList) => {
  return (
    <>
      {isJobListOpen && (
        <TableRow sx={{ height: '70px' }}>
          <TableCell
            sx={{ borderTop: 'none', backgroundColor: BACKGROUND_TABLE }}
            colSpan={6}
          >
            <Box display="flex" alignItems="flex-start">
              <Text
                sx={{
                  marginRight: '24px',
                  marginTop: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                Job Applied
              </Text>
              <Box>
                {jobs.map((item) => (
                  <Chip
                    key={item?.id}
                    sx={{ marginRight: 2, marginBottom: 2, marginTop: 2 }}
                    label={`${item?.id} - ${item?.title} (${item?.branch_name})`}
                    variant="body2"
                    color="secondary"
                  />
                ))}
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default JobList;
