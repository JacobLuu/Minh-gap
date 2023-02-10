import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { Candidates } from '../../../types/Responses/CandidatesResponse';

interface IInterviewDialog {
  data: Candidates;
  isUserInfoOpen: boolean;
  handleClickOnAvatar: React.EventHandler<any>;
}
const InterviewDialog = ({
  isUserInfoOpen,
  data,
  handleClickOnAvatar,
}: IInterviewDialog) => {
  const fullName = [data?.first_name, data?.middle_name, data?.last_name];

  return (
    <Dialog
      maxWidth="344px"
      isOpenDialog={isUserInfoOpen}
      isContentAlignCenter
      title={fullName?.join(' ')}
      handleCloseDialog={handleClickOnAvatar}
      urlIcon={
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px auto',
          }}
          src={data?.profile_image_url}
          {...getShortcutName(data?.first_name)}
          onClick={handleClickOnAvatar}
        />
      }
    >
      <Box mb={6}>
        <Typography variant="subtitle1">{data.name}</Typography>

        <Typography color="text.content">Candidate</Typography>
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

export default InterviewDialog;
