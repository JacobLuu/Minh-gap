import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { Candidates } from '../../types/Responses/CandidatesResponse';

interface ICandidateDialog {
  candidateData: Candidates;
  isUserInfoOpen: boolean;
  handleClickOnAvatar: React.EventHandler<any>;
}

const CandidateDialog = ({
  isUserInfoOpen,
  candidateData,
  handleClickOnAvatar,
}: ICandidateDialog) => {
  const fullName = [
    candidateData?.first_name,
    candidateData?.middle_name,
    candidateData?.last_name,
  ];
  return (
    <Dialog
      maxWidth="344px"
      isOpenDialog={isUserInfoOpen}
      handleCloseDialog={handleClickOnAvatar}
      isContentAlignCenter
      urlIcon={
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px auto',
          }}
          src={candidateData?.profile_image_url}
          {...getShortcutName(candidateData?.first_name)}
          onClick={handleClickOnAvatar}
        />
      }
    >
      <Box mb={6}>
        <Typography variant="subtitle1">{fullName?.join(' ')}</Typography>
        <Typography pb={2} variant="subtitle2" color="text.content">
          {candidateData?.email}
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          {candidateData?.phone_number}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default CandidateDialog;
