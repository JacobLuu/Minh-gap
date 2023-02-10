import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';

import IssueLogs from './IssueLogs';

const EscalatedIssueView = ({ isDialogOpen, handleOnclick }) => {
  const [isDialogSolveIssueOpen, setIsDialogSolveIssueOpen] =
    useState<boolean>(false);

  const [isDialogUnsavedOpen, setIsDialogUnsavedOpen] =
    useState<boolean>(false);

  const handleUnsavedCancel = () => {
    setIsDialogUnsavedOpen(false);
  };

  const handleUnsaved = () => {
    handleUnsavedCancel();
  };

  const handleSolveIssue = () => {
    setIsDialogSolveIssueOpen(!isDialogSolveIssueOpen);
  };

  const handleSolveIssueCancel = () => {
    setIsDialogSolveIssueOpen(false);
  };

  return (
    <Dialog maxWidth="477px" isOpenDialog={isDialogOpen}>
      <Box
        mb={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Escalated issue</Typography>
      </Box>

      <IssueLogs />
      <Button
        fullWidth
        color="primary"
        variant="outlined"
        sx={{ marginTop: '20px', marginBottom: '15px' }}
        onClick={() => handleOnclick()}
      >
        Close
      </Button>
      <Dialog
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
        isOpenDialog={isDialogUnsavedOpen}
        isContentAlignCenter
        maxWidth="380px"
      >
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleUnsavedCancel}
            variant="outlined"
            style={{ marginRight: '10px' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleUnsaved} variant="contained" autoFocus>
            Yes
          </Button>
        </Box>
      </Dialog>

      <Dialog
        title="Solve issue?"
        description="Are you sure you have solved this issue? Your action will be saved to logs"
        isOpenDialog={isDialogSolveIssueOpen}
        isContentAlignCenter
        maxWidth="380px"
      >
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleSolveIssueCancel}
            variant="outlined"
            style={{ marginRight: '10px' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleSolveIssue} variant="contained" autoFocus>
            Yes
          </Button>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default EscalatedIssueView;
