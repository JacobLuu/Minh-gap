import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

interface ImageMatchDialogProps {
  title: JSX.Element;
  description: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

const ImageMatchDialog = (props: ImageMatchDialogProps) => {
  const { description, title, isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          borderRadius: 8,
          paddingBottom: 12,
          paddingTop: 12,
          maxWidth: 330,
        },
      }}
    >
      <Box display="flex" justifyContent="center" mt={4} mb={5}>
        {title}
      </Box>
      <Box px={5} mb={4} display="flex" justifyContent="center">
        {description}
      </Box>
      <DialogActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageMatchDialog;
