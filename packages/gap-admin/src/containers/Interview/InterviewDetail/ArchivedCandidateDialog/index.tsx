import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Dialog from 'gap-common/src/components/Dialog';
import { CANDIDATE_STATUS } from 'gap-common/src/constants/enums';

const ArchivedCandidateDialog = ({
  archive,
  isDialogOpen,
  handleDialog,
  handleCandidateJobsToArchived,
}) => {
  return (
    <Dialog
      maxWidth="386px"
      isContentAlignCenter
      isOpenDialog={isDialogOpen}
      handleCloseDialog={handleDialog}
      title={archive ? 'Archived candidate' : 'Unarchive candidate'}
    >
      <Box mb={6}>
        <Typography variant="subtitle2" color="text.content">
          {archive
            ? 'Do you confirm to archive this candidate ?'
            : 'Do you confirm to interview this candidate ?'}
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          {archive
            ? 'You can find this candidate back in candidate list'
            : 'You can find this candidate back in interview list'}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          sx={{ width: '95px' }}
          color="primary"
          variant="outlined"
          onClick={handleDialog}
        >
          Cancel
        </Button>

        <Button
          sx={{ width: '95px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            handleDialog();
            if (archive) {
              handleCandidateJobsToArchived(CANDIDATE_STATUS.ARCHIVED);
            } else {
              handleCandidateJobsToArchived(CANDIDATE_STATUS.INTERVIEW);
            }
          }}
        >
          Yes
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ArchivedCandidateDialog;
