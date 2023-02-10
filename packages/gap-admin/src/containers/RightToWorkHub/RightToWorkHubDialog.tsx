import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from 'gap-common/src/components/Dialog';
import { HelperText } from './styles';

const RightToWorkHubDialog = ({
  isUserInfoOpen,
  data,
  handleClickOffAvatar,
}) => {
  return (
    <Dialog
      maxWidth="344px"
      isOpenDialog={isUserInfoOpen}
      title={data.name}
      handleCloseDialog={handleClickOffAvatar}
      isContentAlignCenter
      urlIcon={
        <img
          src={data?.profile_image_url}
          width="80px"
          height="80px"
          alt={data.name}
          style={{ borderRadius: '50%' }}
        />
      }
    >
      <Box>
        <HelperText>Candidate</HelperText>
      </Box>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOffAvatar}
      >
        Interview Page
      </Button>

      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOffAvatar}
      >
        Employment History
      </Button>

      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOffAvatar}
      >
        Generate key emails
      </Button>
    </Dialog>
  );
};

export default RightToWorkHubDialog;
