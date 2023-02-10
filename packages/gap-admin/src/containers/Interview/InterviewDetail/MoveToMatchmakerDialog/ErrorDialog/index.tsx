import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Dialog from 'gap-common/src/components/Dialog';
import { ReactComponent as IconCross } from 'gap-common/src/assets/images/Icon_cross.svg';
import { ERROR_COLOR, WHITE_COLOR } from '../../../../../themes/Colors';

interface IErrorDialog {
  isDialogOpen: boolean;
  handleDialog: () => void;
}

const ErrorDialog = ({ isDialogOpen, handleDialog }: IErrorDialog) => {
  return (
    <Dialog
      maxWidth="460px"
      isContentAlignCenter
      isOpenDialog={isDialogOpen}
      handleCloseDialog={handleDialog}
      urlIcon={
        <IconCross
          fill={WHITE_COLOR}
          style={{
            background: ERROR_COLOR,
            width: 70,
            height: 70,
            borderRadius: '50%',
          }}
        />
      }
    >
      <Box my={6}>
        <Typography variant="h4" color="text.error" mb={3}>
          Error moving candidate to matchmaker
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          This candidate is already present in Matchmaker, please go to
          Matchmaker to confirm
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          sx={{ width: '100%' }}
          color="primary"
          variant="outlined"
          onClick={handleDialog}
        >
          Close
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ErrorDialog;
