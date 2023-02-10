import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { WHITE_COLOR } from '../../../../themes/Colors';

const Notes = ({ screeningCallNoteData }) => {
  return (
    <Box
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
      mt={4}
      p={5}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="subtitle1">Notes</Typography>
      </Box>
      <Divider />
      <Typography pt={4} variant="subtitle2">
        {screeningCallNoteData?.screening_call_note?.content}
      </Typography>
    </Box>
  );
};

export default Notes;
