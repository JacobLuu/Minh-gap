import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { Container } from './styles';

interface IDialog {
  title?: string | JSX.Element;
  urlIcon?: any;
  description?: string | JSX.Element;
  maxWidth?: any;
  handleCloseDialog?: (data: any) => void;
  isContentAlignCenter?: boolean;
  isOpenDialog?: boolean;
  children?: ReactNode;
}

const Dialog = ({
  urlIcon,
  title,
  description,
  isOpenDialog,
  isContentAlignCenter,
  maxWidth,
  handleCloseDialog,
  children,
}: IDialog) => {
  return (
    <Container
      maxWidth={maxWidth}
      contentcenter={isContentAlignCenter.toString() || undefined}
      open={isOpenDialog}
      onClose={handleCloseDialog}
    >
      <Box className="content">
        {urlIcon && urlIcon}
        {title && (
          <Typography className="title" variant="h4">
            {title}
          </Typography>
        )}
        {description && (
          <Typography className="description">{description}</Typography>
        )}
        {children}
      </Box>
    </Container>
  );
};

Dialog.defaultProps = {
  title: '',
  urlIcon: '',
  description: '',
  maxWidth: '',
  handleCloseDialog: null,
  isOpenDialog: false,
  isContentAlignCenter: false,
  children: null,
};

export default Dialog;
