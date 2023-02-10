import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import ConfirmBeforeLeaveModal from 'gap-common/src/components/ConfirmBeforeLeaveModal';
import { getEscalatedIssueType } from 'gap-common/src/utils/customHooks';
import GetEscalatedIssuesFlag from 'gap-common/src/utils/getEscalatedIssuesFlag';
import { APPLICANT_DETAILS_CATEGORY } from 'gap-common/src/constants/enums';
import {
  calculateProgress,
  getProgress,
} from 'gap-common/src/utils/calculateProgress';
import EscalatedIssueMenu from '../EscalatedIssueMenu';
import EscalatedIssueDialog from '../EscalatedIssueDialog';
import { selectInterviewDetailStore } from '../../reducer';
import { useAppSelector } from '../../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../../themes/Colors';
import { Dot, TitleBar } from '../../../styles';

const FinancialInformationPage = () => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);
  const { interviewDetailData } = useAppSelector(selectInterviewDetailStore);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const progress = getProgress(
    interviewDetailData?.progresses,
    APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION,
  );

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
      return item.category === APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION;
    })
    .reverse();

  const formStateStatus =
    !form.formState.isSubmitSuccessful && form.formState.isDirty;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleDialogOpen = () => {
    setIsIssueDialogOpen(!isIssueDialogOpen);
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
            Financial Information
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            onClick={(e) => {
              return escalatedIssuesLogs?.length > 0
                ? handleMenuOpen(e)
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
          Questions & Answers
        </Typography>
      </TitleBar>

      <Box px={5}>
        <Box display="flex" my={5}>
          <Typography
            sx={{ width: '50%' }}
            variant="label"
            color="text.content"
          >
            Question
          </Typography>
          <Typography
            sx={{ width: '50%' }}
            variant="label"
            color="text.content"
          >
            Answer
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" my={4}>
          <Typography
            sx={{ width: '50%' }}
            variant="subtitle2"
            fontWeight={500}
          >
            Do you have UK Bank Account ?
          </Typography>
          <Box sx={{ width: '50%' }}>
            {interviewDetailData?.bank_account?.is_uk_bank_account ? (
              <Chip
                label={
                  interviewDetailData?.bank_account?.is_uk_bank_account
                    ? 'Yes'
                    : 'No'
                }
                color={
                  interviewDetailData?.bank_account?.is_uk_bank_account
                    ? 'success'
                    : 'error'
                }
                variant="body2"
              />
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Box>

      {interviewDetailData?.bank_account?.is_uk_bank_account && (
        <>
          <TitleBar>
            <Typography variant="subtitle2" fontWeight={600} mr={4}>
              Payment Details
            </Typography>
          </TitleBar>

          <Box px={5} pt={3}>
            <Grid container>
              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.bank_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account Name
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.account_name || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Account Number
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.account_number || '-'}
                </Typography>
              </Grid>

              <Grid item sm={12} md={3} xl={4}>
                <Box mb={2}>
                  <Typography variant="label" color="text.content">
                    Bank Sort Code
                  </Typography>
                </Box>

                <Typography variant="body2">
                  {interviewDetailData?.bank_account?.bank_sort_code || '-'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <EscalatedIssueMenu
        form={form}
        isMenuOpen={isMenuOpen}
        anchorElMenu={anchorElMenu}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        escalatedIssuesLogs={escalatedIssuesLogs}
        interviewDetailData={interviewDetailData}
        category={APPLICANT_DETAILS_CATEGORY.DECLARATIONS}
      />

      <ConfirmBeforeLeaveModal
        isBlocked={formStateStatus}
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
      />

      <EscalatedIssueDialog
        form={form}
        category={APPLICANT_DETAILS_CATEGORY.FINANCIAL_INFORMATION}
        escalatedIssuesLogs={escalatedIssuesLogs}
        isDialogOpen={isIssueDialogOpen}
        handleDialogOpen={handleDialogOpen}
        interviewDetailData={interviewDetailData}
      />
    </Box>
  );
};

export default FinancialInformationPage;
