import React, { useState } from 'react';
import { Box, Typography, Grid, MenuItem, Menu } from '@mui/material';
import DocumentCard from 'gap-common/src/components/DocumentCard';
import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import { ReactComponent as IconPdf } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import documentRequest from '../../../../mockData/documentRequest.json';
import documentConfirmed from '../../../../mockData/documentConfirmed.json';
import {
  BAR_TABLE,
  ERROR_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../../../themes/Colors';

// currently using mock data, will be replaced when integrate API
const Document = () => {
  const MENU = {
    DELETE: 1,
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenRevoked = Boolean(anchorEl);
  const handleOpenAction = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
    >
      <Box p={5}>
        <Typography variant="subtitle1">Document</Typography>
      </Box>
      <Box
        style={{ backgroundColor: BAR_TABLE }}
        py={3}
        px={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="body2">Documents & Contracts</Typography>
        </Box>
      </Box>
      <Grid container spacing={4} mx={5} my={3}>
        {documentRequest.map((document) => (
          <Grid key={document.id} item xs={12} sm={12} md={8} lg={4} mr={3}>
            <DocumentCard
              buttonText="View details"
              type={document.type}
              documentName={document.document_name}
              updateAt={document.update_at}
              status={document.status}
              iconPdf={<IconPdf fill={PRIMARY_COLOR} />}
              iconEye={<IconEye fill={PRIMARY_COLOR} />}
              handleOpenMenu={(e) => handleOpenAction(e)}
              handleClickIcon={
                <Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={isOpenRevoked}
                    id="menu"
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem key={MENU.DELETE} value={MENU.DELETE}>
                      <Box display="flex">
                        <Typography
                          variant="subtitle1"
                          color="text.error"
                          mx={2}
                        >
                          Delete
                        </Typography>
                        <IconTrash fill={ERROR_COLOR} />
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
              }
            />
          </Grid>
        ))}
      </Grid>
      <Box style={{ backgroundColor: BAR_TABLE }} p={5}>
        <Typography variant="subtitle1">Candidate Documents</Typography>
      </Box>
      <Grid container spacing={4} mx={5} my={3}>
        {documentConfirmed.map((document) => (
          <Grid key={document.id} item xs={12} sm={12} md={8} lg={4} mr={3}>
            <DocumentCard
              buttonText="View details"
              type={document.type}
              documentName={document.document_name}
              iconPdf={<IconPdf fill={PRIMARY_COLOR} />}
              iconEye={<IconEye fill={PRIMARY_COLOR} />}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Document;
