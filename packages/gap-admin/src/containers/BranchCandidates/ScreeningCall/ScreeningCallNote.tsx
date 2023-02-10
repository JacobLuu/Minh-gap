import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { ScreeningCallNote } from '../../../types/Responses';
import { WHITE_COLOR } from '../../../themes/Colors';

interface IScreeningCallNote {
  data: ScreeningCallNote;
}

const Note = ({ data }: IScreeningCallNote) => {
  return (
    <Box
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
      mt={4}
      p={5}
    >
      <Box>
        <Box mb={3}>
          <Typography variant="subtitle1">Screening call note</Typography>
        </Box>
        <Divider />
        <Typography pt={4} variant="subtitle2">
          {data?.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Note;
