import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import Dialog from 'gap-common/src/components/Dialog';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import moment from 'moment';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import EscalatedIssueMenu from '../EscalatedIssueMenu';
import { selectInterviewDetailStore } from '../../reducer';
import { useAppSelector } from '../../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const PersonalDetails = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const [isDialogRemoveIssueOpen, setIsDialogRemoveIssueOpen] =
    useState<boolean>(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const { interviewDetailData } = useAppSelector(selectInterviewDetailStore);
  const handleRemoveIssue = () => {
    setIsDialogRemoveIssueOpen(!isDialogRemoveIssueOpen);
  };

  const handleRemoveIssueCancel = () => {
    setIsDialogRemoveIssueOpen(false);
  };

  const schema = Yup.object().shape({
    issueType: Yup.object().required('').nullable(),
    contentLog: Yup.string().required('').nullable(),
  });

  const form = useForm({
    defaultValues: {
      issueType: '',
      contentLog: '',
    },
    resolver: yupResolver(schema),
  });

  const escalatedIssuesLogs = interviewDetailData?.escalated_issues
    ?.filter((item) => {
      return item.category === APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS,
  );

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  useEffect(() => {
    if (escalatedIssuesLogs?.length > 0) {
      form.reset({
        issueType: {
          label: getEscalatedIssueType(escalatedIssuesLogs?.[0]?.type),
          value: escalatedIssuesLogs?.[0]?.type,
        },
        contentLog: escalatedIssuesLogs?.[0]?.content,
      });
    }
  }, [interviewDetailData?.escalated_issues]);

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
            onClick={(e) => {
              return escalatedIssuesLogs?.length > 0
                ? handleClick(e)
                : handleDialogOpen();
            }}
            sx={{ cursor: 'pointer' }}
          >
            {GetEscalatedIssuesFlag(escalatedIssuesLogs?.[0]?.status)}

            {escalatedIssuesLogs?.length > 0 && (
              <IconArrowDown
                style={{
                  marginLeft: '12px',
                  transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
                fill={BLACK_COLOR}
              />
            )}
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
                {interviewDetailData?.title || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                First name
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.first_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Middle name
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.middle_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Last name
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.last_name || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Email
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.email || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Phone number
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.phone_number || '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item py={3} sm={12} md={6} xl={4}>
            <Box>
              <Typography pb={1} variant="label" color="text.content">
                Date of birth
              </Typography>
              <Typography variant="subtitle2">
                {interviewDetailData?.date_of_birth
                  ? moment(new Date(interviewDetailData?.date_of_birth)).format(
                      'MM/DD/yyyy',
                    )
                  : '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS}
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.PERSONAL_DETAILS}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />

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
    </Box>
  );
};

export default PersonalDetails;
