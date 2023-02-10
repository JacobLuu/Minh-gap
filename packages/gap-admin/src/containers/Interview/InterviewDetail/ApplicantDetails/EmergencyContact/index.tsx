import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Stack, Button } from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import Flags from 'country-flag-icons/react/3x2';
import { parsePhoneNumber } from 'libphonenumber-js';

import { enforcePhoneNumberPattern } from 'gap-common/src/utils/enforcePhoneNumberPattern';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import { useLocation } from 'react-router-dom';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import EscalatedIssueView from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/EscalatedIssueView';
import AssigningEscalatedIssue from '../../../../EscalatedIssues/EscalatedIssue/EscalatedIssuePopup/AssigningEscalatedIssue';
import CLIENT_PATH from '../../../../../constants/clientPath';

import { selectInterviewDetailStore } from '../../reducer';
import { useAppSelector } from '../../../../../redux/hooks';

import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';
import EscalatedIssueMenu from '../EscalatedIssueMenu';

const EmergencyContactPage = () => {
  const location = useLocation();
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);

  const { interviewDetailData } = useAppSelector(selectInterviewDetailStore);

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

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [isEscalatedIssueDialogOpen, setIsEscalatedIssueDialogOpen] =
    useState(false);
  const [isAssigningEscalatedIssueOpen, setIsAssigningEscalatedIssueOpen] =
    useState(false);

  const handleOnclickEscalatedView = () => {
    setIsEscalatedIssueDialogOpen(!isEscalatedIssueDialogOpen);
  };
  const handleOnclickAssigningEscalatedIssue = () => {
    setIsAssigningEscalatedIssueOpen(!isAssigningEscalatedIssueOpen);
  };

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
  };

  const escalatedIssuesLogs = interviewDetailData?.escalated_issues
    ?.filter((item) => {
      return item.category === APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const convertPhoneNumberToE164 = enforcePhoneNumberPattern(
    interviewDetailData?.emergency_contact?.phone_number,
  );

  const parsedPhoneNumber =
    convertPhoneNumberToE164 && parsePhoneNumber(convertPhoneNumberToE164);

  const Flag = Flags[parsedPhoneNumber?.country];

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
      <Box display="flex" justifyContent="space-between">
        <Box px={5}>
          <Box display="flex" alignItems="center" mt={7} mb={1}>
            <Typography variant="subtitle1" mr={4}>
              Emergency Contact
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
        {location.pathname.includes(CLIENT_PATH.ESCALATED_ISSUES) && (
          <Box display="flex" alignItems="center" mt={7} mb={1}>
            <Button
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={handleOnclickAssigningEscalatedIssue}
            >
              Assign escalated issue
            </Button>
            <Button
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={handleOnclickEscalatedView}
            >
              View escalated issue
            </Button>
          </Box>
        )}
        {location.pathname.includes(CLIENT_PATH.BRANCH_CANDIDATES) && (
          <Box display="flex" alignItems="start" mt={7} mb={1} mr={5}>
            <Button variant="outlined">View escalated issue</Button>
          </Box>
        )}
      </Box>

      <TitleBar>
        <Typography variant="subtitle2" fontWeight={600} mr={4}>
          Contact Information
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Grid container>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Typography variant="label" color="text.content">
              Emergency Contact Number
            </Typography>
            <Stack direction="row" spacing={1} pt={2}>
              {interviewDetailData?.emergency_contact?.phone_number && (
                <Box width={32}>{convertPhoneNumberToE164 && <Flag />}</Box>
              )}
              <Typography variant="subtitle2">
                {interviewDetailData?.emergency_contact?.phone_number || '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Typography variant="label" color="text.content">
              Name
            </Typography>
            <Box pt={2}>
              <Typography variant="subtitle2">
                {interviewDetailData?.emergency_contact?.first_name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item pt={3} sm={12} md={4} xl={4}>
            <Box>
              <Typography variant="label" color="text.content">
                Relationship
              </Typography>
              <Box pt={2}>
                <Typography variant="subtitle2">
                  {interviewDetailData?.emergency_contact?.relationship || '-'}
                </Typography>
              </Box>
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
        category={APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.EMERGENCY_CONTACT}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />

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

export default EmergencyContactPage;
