import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Dialog from 'gap-common/src/components/Dialog';
import { ReactComponent as IconCheck } from 'gap-common/src/assets/images/icon_check_circle.svg';
import { SUCCESS_COLOR } from '../../../../../themes/Colors';

interface ISuccessDialog {
  isDialogOpen: boolean;
  handleDialog: () => void;
  handleCloseDialog: () => void;
}

const SuccessDialog = ({
  isDialogOpen,
  handleDialog,
  handleCloseDialog,
}: ISuccessDialog) => {
  return (
    <Dialog
      maxWidth="460px"
      isContentAlignCenter
      isOpenDialog={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
      urlIcon={
        <IconCheck fill={SUCCESS_COLOR} style={{ width: 70, height: 70 }} />
      }
    >
      <Box my={6}>
        <Typography variant="h4" color="text.success" mb={3}>
          Moved to Matchmaker successfully
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          You have added this candidate to Matchmaker successfully
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          sx={{ width: '100%' }}
          color="primary"
          variant="outlined"
          onClick={handleDialog}
        >
          Back to interview list
        </Button>
      </Stack>
    </Dialog>
  );
};

export default SuccessDialog;
