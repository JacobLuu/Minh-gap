import React from 'react';
import { Box, TableCell, TableRow, Chip } from '@mui/material';

import { BACKGROUND_TABLE } from '../../themes/Colors';
import { Text } from './styles';

const AdvertResponses = ({ data, isJobListOpen }) => {
  return (
    <>
      {isJobListOpen && (
        <TableRow sx={{ height: '70px' }}>
          <TableCell
            sx={{ borderTop: 'none', backgroundColor: BACKGROUND_TABLE }}
            colSpan={7}
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
                {data.map((item) => (
                  <Chip
                    key={item?.id}
                    sx={{ marginRight: 2, marginBottom: 2 }}
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

export default AdvertResponses;
