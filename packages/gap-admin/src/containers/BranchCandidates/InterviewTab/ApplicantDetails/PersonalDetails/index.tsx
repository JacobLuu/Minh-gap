import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Menu, MenuItem } from '@mui/material';
import Dialog from 'gap-common/src/components/Dialog';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { ReactComponent as IconFlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ReactComponent as IconUser } from 'gap-common/src/assets/images/icon_user.svg';
import { ReactComponent as IconEdit } from 'gap-common/src/assets/images/icon_edit.svg';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import AssigningEscalatedIssue from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/AssigningEscalatedIssue';
import EscalatedIssueView from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/EscalatedIssueView';

import {
  BLACK_COLOR,
  SUCCESS_COLOR,
  CONTENT_COLOR,
} from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const PersonalDetails = ({ branchInterviewDetailData }) => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isDialogRemoveIssueOpen, setIsDialogRemoveIssueOpen] =
    useState<boolean>(false);
  const [isEscalatedIssueDialogOpen, setIsEscalatedIssueDialogOpen] =
    useState(false);
  const [isAssigningEscalatedIssueOpen, setIsAssigningEscalatedIssueOpen] =
    useState(false);
  const handleRemoveIssue = () => {
    setIsDialogRemoveIssueOpen(!isDialogRemoveIssueOpen);
  };

  const handleRemoveIssueCancel = () => {
    setIsDialogRemoveIssueOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleOnclickEscalatedView = () => {
    setIsEscalatedIssueDialogOpen(!isEscalatedIssueDialogOpen);
  };
  const handleOnclickAssigningEscalatedIssue = () => {
    setIsAssigningEscalatedIssueOpen(!isAssigningEscalatedIssueOpen);
  };

  const form = useForm({
    defaultValues: {
      issueType: '',
      contentLog: '',
    },
  });

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const progress = getProgress(
    branchInterviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS,
  );

  return (
    <Box>
      <Box px={5}>
        <Box display="flex" alignItems="center" mt={7} mb={1}>
          <Typography variant="subtitle1" mr={4}>
            Personal Details
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <IconFlagFilled fill={SUCCESS_COLOR} width={20} height={20} />
            <IconArrowDown
              style={{
                marginLeft: '12px',
                transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
              }}
              fill={BLACK_COLOR}
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={6}>
          <Typography
            variant="label"
            color={calculateProgress(progress).textColor}
            fontWeight={500}
          >
            <Dot component="span" mr={2} />
            {calculateProgress(progress).status}
          </Typography>
        </Box>
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Personal Information
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Grid container>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Title
              </Typography>
              <Typography variant="subtitle2" textTransform="capitalize">
                {branchInterviewDetailData?.title || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                First name
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.first_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Middle name
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.middle_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Last name
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.last_name || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Email
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.email || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Phone number
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.phone_number || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Date of birth
              </Typography>
              <Typography variant="subtitle2">
                {branchInterviewDetailData?.date_of_birth
                  ? moment(
                      new Date(branchInterviewDetailData?.date_of_birth),
                    ).format('MM/DD/yyyy')
                  : '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <Dialog
        title="Remove issue?"
        description="Are you sure you want to delete issues? All issues and logs will be permanently deleted."
        isOpenDialog={isDialogRemoveIssueOpen}
        isContentAlignCenter
        maxWidth="380px"
      >
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleRemoveIssueCancel}
            variant="outlined"
            style={{ marginRight: '10px' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleRemoveIssue} variant="contained" autoFocus>
            Yes
          </Button>
        </Box>
      </Dialog>

      <Menu anchorEl={anchorElMenu} open={isMenuOpen} onClose={handleClose}>
        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            handleOnclickEscalatedView();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2}>
              <IconEdit fill={CONTENT_COLOR} />
            </Box>
            <Typography variant="optionText">View escalated issue</Typography>
          </Box>
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            handleOnclickAssigningEscalatedIssue();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Box display="flex" alignItems="center" mr={2} width="24px">
              <IconUser fill={CONTENT_COLOR} />
            </Box>
            <Typography variant="optionText">Assign escalated issue</Typography>
          </Box>
        </MenuItem>
      </Menu>

      <EscalatedIssueView
        isDialogOpen={isEscalatedIssueDialogOpen}
        handleOnclick={handleOnclickEscalatedView}
      />
      <AssigningEscalatedIssue
        isDialogOpen={isAssigningEscalatedIssueOpen}
        handleOnclick={handleOnclickAssigningEscalatedIssue}
      />
    </Box>
  );
};

export default PersonalDetails;
