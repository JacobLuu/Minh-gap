import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from 'gap-common/src/components/Dialog';
import Typography from '@mui/material/Typography';
import { Candidates } from '../../types/Responses/CandidatesResponse';

interface IBranchCandidatesDialog {
  data: Candidates;
  isUserInfoOpen: boolean;
  handleClickOnAvatar: React.EventHandler<any>;
}

const BranchCandidatesDialog = ({
  isUserInfoOpen,
  data,
  handleClickOnAvatar,
}: IBranchCandidatesDialog) => {
  return (
    <Dialog
      maxWidth="344px"
      isOpenDialog={isUserInfoOpen}
      title={`${data?.first_name} ${data?.last_name}`}
      handleCloseDialog={handleClickOnAvatar}
      isContentAlignCenter
      urlIcon={
        <img
          src={data?.profile_image_url}
          width="80px"
          height="80px"
          alt={`${data?.first_name} ${data?.last_name}`}
          style={{ borderRadius: '50%' }}
        />
      }
    >
      <Box className="description">
        <Typography>Candidate</Typography>
      </Box>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Interview Page
      </Button>

      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Employment History
      </Button>

      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Generate key emails
      </Button>
    </Dialog>
  );
};

export default BranchCandidatesDialog;
