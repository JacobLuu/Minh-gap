import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import { getShortcutName } from 'gap-common/src/utils/customHooks';

const AdvertResponsesDialog = ({
  isUserInfoOpen,
  advertResponsesDataTableRow,
  handleClickOnAvatar,
}) => {
  const fullName = [
    advertResponsesDataTableRow?.first_name,
    advertResponsesDataTableRow?.middle_name,
    advertResponsesDataTableRow?.last_name,
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
          src={advertResponsesDataTableRow?.profile_image_url}
          {...getShortcutName(advertResponsesDataTableRow?.first_name)}
          onClick={handleClickOnAvatar}
        />
      }
    >
      <Box mb={6}>
        <Typography variant="subtitle1">{fullName?.join(' ')}</Typography>
        <Typography pb={2} variant="subtitle2" color="text.content">
          {advertResponsesDataTableRow?.email}
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          {advertResponsesDataTableRow?.phone_number}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default AdvertResponsesDialog;
