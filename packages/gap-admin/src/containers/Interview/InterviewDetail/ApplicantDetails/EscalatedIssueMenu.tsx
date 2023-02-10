import React from 'react';
import { Box, Typography, MenuItem, Menu } from '@mui/material';
import { ESCALATED_ISSUES_STATUS } from 'gap-common/src/constants/enums';
import { ReactComponent as IconEdit } from 'gap-common/src/assets/images/icon_edit.svg';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import { useAppDispatch } from '../../../../redux/hooks';
import { updateEscalatedIssuesRequest } from '../reducer';

const EscalatedIssueMenu = ({
  form,
  category,
  isMenuOpen,
  anchorElMenu,
  handleMenuClose,
  handleDialogOpen,
  escalatedIssuesLogs,
  interviewDetailData,
}) => {
  const dispatch = useAppDispatch();
  const handleEscalatedIssueRemove = (data) => {
    const personalDetailsEscalatedIssueData = {
      candidate_id: interviewDetailData?.id,
      type: data?.issueType?.value,
      content: data?.contentLog,
      category: category,
    };

    dispatch(
      updateEscalatedIssuesRequest({
        ...personalDetailsEscalatedIssueData,
        issue_id: escalatedIssuesLogs?.[0]?.id,
        status: ESCALATED_ISSUES_STATUS.DELETED,
        message: 'Issue remove success.',
      }),
    );
    form.reset({
      issueType: '',
      contentLog: '',
    });
  };

  return (
    <Menu anchorEl={anchorElMenu} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem
        sx={{ color: 'text.content' }}
        onClick={() => {
          handleDialogOpen();
          handleMenuClose();
        }}
      >
        <Box display="flex" alignItems="center" color="primary">
          <Box display="flex" alignItems="center" mr={2}>
            <IconEdit />
          </Box>
          <Typography variant="optionText">Edit escalated issue</Typography>
        </Box>
      </MenuItem>

      <MenuItem
        sx={{ color: 'text.error' }}
        onClick={() => {
          form.handleSubmit(handleEscalatedIssueRemove)();
          handleMenuClose();
        }}
      >
        <Box display="flex" alignItems="center" color="primary">
          <Box display="flex" alignItems="center" mr={2}>
            <IconTrash />
          </Box>
          <Typography variant="optionText">Remove escalated issue</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};

export default EscalatedIssueMenu;
